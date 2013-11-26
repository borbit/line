(function() {
  var $line = $one('.line');
  var $sections = $all('.line__section');

  var lineHeight = $line.offsetHeight;
  var lineWidth = $line.offsetWidth;
  var margin = 500;

  $sections.forEach(function($section) {
    $section.dataset.top = $section.offsetTop;
    $section.dataset.bottom = $section.offsetTop + $section.offsetHeight;

    $on($section, 'click', function() {
      Swipe($section);
    });
  })

  $on($line, 'scroll', _.debounce(show, 50));
  $on(window, 'resize', function() {
    lineHeight = $line.offsetHeight;
    lineWidth = $line.offsetWidth;
  });

  show();

  function show() {
    var lineY1 = $line.scrollTop;
    var lineY2 = lineY1 + lineHeight;
    
    $sections.forEach(function($section) {
      if ($section.dataset.bottom >= lineY1 - margin &&
          $section.dataset.top <= lineY2 + margin) {
        $section.line || ($section.line = Line($section));
        $section.line.showPhotos();
      } else if ($section.line) {
        $section.line.hidePhotos();
      }
    });
  }

  function Line($section) {
    var $plate = $one('.line__photos', $section);
    var $photos = $all('.line__photo', $section);
    var hammer = Hammer($plate, {
      prevent_mouseevents: true
    , drag_lock_to_axis: true
    , swipe_velocity: 0.5
    });

    var plateWidth = $photos.length * lineWidth;
    var plateDelta = 0;

    hammer.on('dragleft dragright', function(ev) {
      ev.gesture.preventDefault();
      finishArranging($plate);

      var delta = plateDelta + ev.gesture.deltaX;
      var translate = 'translate3d(' + delta + 'px, 0, 0)';
      $plate.style.webkitTransform = translate;
    });

    hammer.on('release swipeleft swiperight', function(ev) {
      ev.gesture.preventDefault();
      ev.gesture.stopDetect();

      finishArranging($plate);

      if (ev.type == 'swipeleft' || ev.type == 'swiperight' ||
          Math.abs(ev.gesture.deltaX) > lineWidth / 2) {
        plateDelta += ev.gesture.deltaX < 0 ? -lineWidth : lineWidth;
        plateDelta = Math.max(-plateWidth + lineWidth, plateDelta)
        plateDelta = Math.min(plateDelta, 0);
      }
      
      startArranging($plate, plateDelta);
      loadVisible($photos, plateDelta);
    });

    function showPhotos() {
      var current = -plateDelta / lineWidth;
      for (var i = current; i < $photos.length && i < current + 2; i++) {
        loadPhoto($photos[i]);
      }
    }

    function hidePhotos() {
      for (var i = 0; i < $photos.length; i++) {
        delete $photos[i].dataset.loaded;
        $photos[i].innerHTML = '';
      }
    }

    return {
      showPhotos: showPhotos
    , hidePhotos: hidePhotos
    };
  }

  function startArranging($plate, plateDelta) {
    var translate = 'translate3d(' + plateDelta + 'px, 0, 0)';
    $plate.style.webkitTransition = '-webkit-transform .2s';
    $plate.style.webkitTransform = translate;
    $plate.dataset.timer = $timeout(function() {
      finishArranging($plate);
    }, 333);
  }

  function finishArranging($plate) {
    $plate.style.webkitTransition = 'none';
    clearTimeout($plate.dataset.timer);
    $plate.dataset.timer = null;
  }

  function loadVisible($photos, plateDelta) {
    var current = -plateDelta / lineWidth;
    var $photo = $photos[current + 1];

    if ($photo && !$photo.dataset.loaded) {
      loadPhoto($photo);
    }
  }

  function loadPhoto($photo) {
    var src = $photo.dataset.src;
    $photo.dataset.loaded = true;

    loadImage(src, function(img) {
      img.style.opacity = 0;
      img.style.webkitTransition = 'opacity .3s';
      
      $photo.appendChild(img);
      $timeout(function() {
        img.style.opacity = 1;
      })
    });
  }

  function loadImage(src, cb) {
    var img = document.createElement('img');
    img.onload = function() { cb(img); };
    img.setAttribute('draggable', false);
    img.width = lineWidth;
    img.src = src;
  }
})();