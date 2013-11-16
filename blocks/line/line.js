function $all(selector, $el) {
  return Array.prototype.slice.call(($el || document) .querySelectorAll(selector), 0);
}
function $one(selector, $el) {
  return ($el || document).querySelector(selector);
}
function $on($el, event, cb) {
  $el.addEventListener(event, cb, false);
}

(function() {
  var $line = $one('.line');
  var $sections = $all('.line__section');

  var lineHeight = $line.offsetHeight;
  var lineWidth = $line.offsetWidth;

  $sections.forEach(function($section) {
    $section.dataset.top = $section.offsetTop;
    $section.dataset.bottom = $section.offsetTop + $section.offsetHeight;
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
    
    $sections
      .filter(function($section) {
        return $section.dataset.bottom >= lineY1 &&
               $section.dataset.top <= lineY2 &&
              !$section.dataset.inited;
      })
      .forEach(function($section) {
        $section.dataset.inited = true;
        init($section);
      });
  }

  function init($section) {
    var $plate = $one('.line__photos', $section);
    var $photos = $all('.line__photo', $section);
    var hammer = Hammer($plate, {
      prevent_mouseevents: true
    , drag_lock_to_axis: true
    , swipe_velocity: 0.5
    });

    var plateWidth = $photos.length * lineWidth;
    var palteDelta = 0;

    for (var i = 0; i < $photos.length && i < 2; i++) {
      loadPhoto($photos[i]);
    }

    hammer.on('dragleft dragright', function(ev) {
      ev.gesture.preventDefault();
      finishArranging($plate);

      var delta = palteDelta + ev.gesture.deltaX;
      var translate = 'translate(' + delta + 'px, 0)';
      $plate.style.webkitTransform = translate;
    });

    hammer.on('release swipeleft swiperight', function(ev) {
      ev.gesture.preventDefault();
      ev.gesture.stopDetect();

      finishArranging($plate);

      if (ev.type == 'swipeleft' || ev.type == 'swiperight' ||
          Math.abs(ev.gesture.deltaX) > lineWidth / 2) {
        palteDelta += ev.gesture.deltaX < 0 ? -lineWidth : lineWidth;
        palteDelta = Math.max(-plateWidth + lineWidth, palteDelta)
        palteDelta = Math.min(palteDelta, 0);
      }
      
      startArranging($plate, palteDelta);
      loadVisible($photos, palteDelta);
    });
  }

  function startArranging($plate, palteDelta) {
    var translate = 'translate(' + palteDelta + 'px, 0)';
    $plate.style.webkitTransition = '-webkit-transform .3s';
    $plate.style.webkitTransform = translate;

    $plate.dataset.timer = setTimeout(function() {
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
      $photo.style.backgroundImage = 'url(' + img.src + ')';
      $photo.classList.remove('line__photo_loading');
    })
  }

  function loadImage(src, cb) {
    var img = document.createElement('img');
    img.onload = function() { cb(img); };
    img.src = src;
  }
})();