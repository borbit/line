(function() {
  window.Swipe = function($el) {
    var photos = JSON.parse($el.dataset.photos);
    var index = +$el.dataset.index;
    var indexDelta = 0;

    var $el = document.createElement('div');
    $el.innerHTML = document.getElementById('tpl_swipe').innerHTML;
    $el = $one('.swipe', $el);

    var $plate = $one('.swipe__plate', $el);
    var $photos = $all('.swipe__photo', $el);
    var $index = $one('.swipe__index', $el);

    open();

    var screenHeight = $el.offsetHeight;
    var screenWidth = $el.offsetWidth;
    var plateDelta = 0;

    updatePhotos();
    updateIndex();

    var hammer = Hammer($plate, {
      drag_lock_to_axis: true
    , prevent_mouseevents: true
    , swipe_velocity: 0.5
    });

    hammer.on('dragleft dragright', function(ev) {
      ev.gesture.preventDefault();

      var delta = plateDelta + ev.gesture.deltaX;
      var translate = 'translate(' + delta + 'px, 0)';
      $plate.style.webkitTransform = translate;
    });

    hammer.on('release swipeleft swiperight', function(ev) {
      ev.gesture.preventDefault();
      ev.gesture.stopDetect();
      var direction = 0;

      if (~['swipeleft', 'swiperight'].indexOf(ev.type) ||
          Math.abs(ev.gesture.deltaX) > screenWidth / 2) {
        if (ev.gesture.deltaX < 0) {
          direction = -1;
          plateDelta -= screenWidth;
          index = getNextIndex(index);
          indexDelta++;
        } else {
          direction = 1;
          plateDelta += screenWidth;
          index = getPrevIndex(index);
          indexDelta--;
        }
      }

      startAligning(direction);
    });

    hammer.on('tap', function(ev) {
      ev.gesture.stopPropagation();
      ev.gesture.stopDetect();
      close();
    });

    function open() {
      $el.style.webkitTransition = 'opacity .2s';
      $el.style.opacity = 0;

      document.body.appendChild($el);

      $timeout(function() {
        $el.style.opacity = 1;
      });
    }

    function close() {
      $el.style.webkitTransition = 'opacity .2s';
      $el.style.opacity = 0;

      $timeout(function() {
        document.body.removeChild($el);
      }, 400);
    }

    function startAligning(direction) {
      var translate = 'translate(' + plateDelta + 'px, 0)';
      $plate.style.webkitTransition = '-webkit-transform .2s';
      $plate.style.webkitTransform = translate;

      $plate.dataset.timer = $timeout(function() {
        finishAligning(direction);
        updatePhotos();
        updateIndex();
      }, 200);
    }

    function finishAligning(direction) {
      $plate.style.webkitTransition = 'none';
      clearTimeout(+$plate.dataset.timer);
      delete $plate.dataset.timer;

      if (direction < 0) {
        var $photo = $photos.shift();
        delete $photo.dataset.loaded;
        $photos.push($photo);
      }
      if (direction > 0) {
        var $photo = $photos.pop();
        delete $photo.dataset.loaded;
        $photos.unshift($photo);
      }
    }

    function updatePhotos() {
      var indexes = getCurrentIndexes();

      indexes.forEach(function(i, j) {
        var offset = (j + indexDelta - 1) * screenWidth;
        var translate = 'translate(' + offset + 'px, 0)';
        var $photo = $photos[j];
        var src = photos[i];

        $photo.style.webkitTransform = translate;
        $photo.dataset.loaded || loadPhoto($photo, src);
      });
    }

    function loadPhoto($photo, src) {
      $photo.style.opacity = 0;

      loadImage(src, function(img) {
        $photo.style.backgroundImage = 'url(' + src + ')';
        $photo.dataset.loaded = true;

        $timeout(function() {
          $photo.style.webkitTransition = 'opacity .2s';
          $photo.style.opacity = 1;
        })
      });
    }

    function loadImage(src, cb) {
      var img = document.createElement('img');
      img.onload = function() { cb(img); };
      img.src = src;
    }

    function updateIndex() {
      $index.innerHTML = (index + 1) + '/' + photos.length;
    }

    function getCurrentIndexes() {
      return [getPrevIndex(index), index, getNextIndex(index)];
    }

    function getPrevIndex(index) {
      return index == 0 ? photos.length - 1 : index - 1;
    }

    function getNextIndex(index) {
      return index == photos.length - 1 ? 0 : index + 1;
    }
  };
})();