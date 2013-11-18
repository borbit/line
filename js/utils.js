function $all(selector, $el) {
  return Array.prototype.slice.call(($el || document) .querySelectorAll(selector), 0);
}
function $one(selector, $el) {
  return ($el || document).querySelector(selector);
}
function $on($el, event, cb) {
  $el.addEventListener(event, cb, false);
}
function $timeout(cb, time) {
  setTimeout(cb, time || 0);
}