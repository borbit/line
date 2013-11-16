function $all(e,t){return Array.prototype.slice.call((t||document).querySelectorAll(e),0)}function $one(e,t){return(t||document).querySelector(e)}function $on(e,t,n){e.addEventListener(t,n,!1)}(function(e,t){"use strict";function r(){if(n.READY)return;n.event.determineEventTypes();for(var e in n.gestures)n.gestures.hasOwnProperty(e)&&n.detection.register(n.gestures[e]);n.event.onTouch(n.DOCUMENT,n.EVENT_MOVE,n.detection.detect),n.event.onTouch(n.DOCUMENT,n.EVENT_END,n.detection.detect),n.READY=!0}var n=function(e,t){return new n.Instance(e,t||{})};n.defaults={stop_browser_behavior:{userSelect:"none",touchAction:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}},n.HAS_POINTEREVENTS=navigator.pointerEnabled||navigator.msPointerEnabled,n.HAS_TOUCHEVENTS="ontouchstart"in e,n.MOBILE_REGEX=/mobile|tablet|ip(ad|hone|od)|android/i,n.NO_MOUSEEVENTS=n.HAS_TOUCHEVENTS&&navigator.userAgent.match(n.MOBILE_REGEX),n.EVENT_TYPES={},n.DIRECTION_DOWN="down",n.DIRECTION_LEFT="left",n.DIRECTION_UP="up",n.DIRECTION_RIGHT="right",n.POINTER_MOUSE="mouse",n.POINTER_TOUCH="touch",n.POINTER_PEN="pen",n.EVENT_START="start",n.EVENT_MOVE="move",n.EVENT_END="end",n.DOCUMENT=document,n.plugins={},n.READY=!1,n.Instance=function(e,t){var i=this;return r(),this.element=e,this.enabled=!0,this.options=n.utils.extend(n.utils.extend({},n.defaults),t||{}),this.options.stop_browser_behavior&&n.utils.stopDefaultBrowserBehavior(this.element,this.options.stop_browser_behavior),n.event.onTouch(e,n.EVENT_START,function(e){i.enabled&&n.detection.startDetect(i,e)}),this},n.Instance.prototype={on:function(t,n){var r=t.split(" ");for(var i=0;i<r.length;i++)this.element.addEventListener(r[i],n,!1);return this},off:function(t,n){var r=t.split(" ");for(var i=0;i<r.length;i++)this.element.removeEventListener(r[i],n,!1);return this},trigger:function(t,r){var i=n.DOCUMENT.createEvent("Event");i.initEvent(t,!0,!0),i.gesture=r;var s=this.element;return n.utils.hasParent(r.target,s)&&(s=r.target),s.dispatchEvent(i),this},enable:function(t){return this.enabled=t,this}};var i=null,s=!1,o=!1;n.event={bindDom:function(e,t,n){var r=t.split(" ");for(var i=0;i<r.length;i++)e.addEventListener(r[i],n,!1)},onTouch:function(t,r,u){var a=this;this.bindDom(t,n.EVENT_TYPES[r],function(f){var l=f.type.toLowerCase();if(l.match(/mouse/)&&o)return;if(l.match(/touch/)||l.match(/pointerdown/)||l.match(/mouse/)&&f.which===1)s=!0;l.match(/touch|pointer/)&&(o=!0);var c=0;s&&(n.HAS_POINTEREVENTS&&r!=n.EVENT_END?c=n.PointerEvent.updatePointer(r,f):l.match(/touch/)?c=f.touches.length:o||(c=l.match(/up/)?0:1),c>0&&r==n.EVENT_END?r=n.EVENT_MOVE:c||(r=n.EVENT_END),!c&&i!==null?f=i:i=f,u.call(n.detection,a.collectEventData(t,r,f)),n.HAS_POINTEREVENTS&&r==n.EVENT_END&&(c=n.PointerEvent.updatePointer(r,f))),c||(i=null,s=!1,o=!1,n.PointerEvent.reset())})},determineEventTypes:function(){var t;n.HAS_POINTEREVENTS?t=n.PointerEvent.getEvents():n.NO_MOUSEEVENTS?t=["touchstart","touchmove","touchend touchcancel"]:t=["touchstart mousedown","touchmove mousemove","touchend touchcancel mouseup"],n.EVENT_TYPES[n.EVENT_START]=t[0],n.EVENT_TYPES[n.EVENT_MOVE]=t[1],n.EVENT_TYPES[n.EVENT_END]=t[2]},getTouchList:function(t){return n.HAS_POINTEREVENTS?n.PointerEvent.getTouchList():t.touches?t.touches:[{identifier:1,pageX:t.pageX,pageY:t.pageY,target:t.target}]},collectEventData:function(t,r,i){var s=this.getTouchList(i,r),o=n.POINTER_TOUCH;if(i.type.match(/mouse/)||n.PointerEvent.matchType(n.POINTER_MOUSE,i))o=n.POINTER_MOUSE;return{center:n.utils.getCenter(s),timeStamp:(new Date).getTime(),target:i.target,touches:s,eventType:r,pointerType:o,srcEvent:i,preventDefault:function(){this.srcEvent.preventManipulation&&this.srcEvent.preventManipulation(),this.srcEvent.preventDefault&&this.srcEvent.preventDefault()},stopPropagation:function(){this.srcEvent.stopPropagation()},stopDetect:function(){return n.detection.stopDetect()}}}},n.PointerEvent={pointers:{},getTouchList:function(){var e=this,t=[];return Object.keys(e.pointers).sort().forEach(function(n){t.push(e.pointers[n])}),t},updatePointer:function(e,t){return e==n.EVENT_END?this.pointers={}:(t.identifier=t.pointerId,this.pointers[t.pointerId]=t),Object.keys(this.pointers).length},matchType:function(e,t){if(!t.pointerType)return!1;var r={};return r[n.POINTER_MOUSE]=t.pointerType==t.MSPOINTER_TYPE_MOUSE||t.pointerType==n.POINTER_MOUSE,r[n.POINTER_TOUCH]=t.pointerType==t.MSPOINTER_TYPE_TOUCH||t.pointerType==n.POINTER_TOUCH,r[n.POINTER_PEN]=t.pointerType==t.MSPOINTER_TYPE_PEN||t.pointerType==n.POINTER_PEN,r[e]},getEvents:function(){return["pointerdown MSPointerDown","pointermove MSPointerMove","pointerup pointercancel MSPointerUp MSPointerCancel"]},reset:function(){this.pointers={}}},n.utils={extend:function(n,r,i){for(var s in r){if(n[s]!==t&&i)continue;n[s]=r[s]}return n},hasParent:function(e,t){while(e){if(e==t)return!0;e=e.parentNode}return!1},getCenter:function(t){var n=[],r=[];for(var i=0,s=t.length;i<s;i++)n.push(t[i].pageX),r.push(t[i].pageY);return{pageX:(Math.min.apply(Math,n)+Math.max.apply(Math,n))/2,pageY:(Math.min.apply(Math,r)+Math.max.apply(Math,r))/2}},getVelocity:function(t,n,r){return{x:Math.abs(n/t)||0,y:Math.abs(r/t)||0}},getAngle:function(t,n){var r=n.pageY-t.pageY,i=n.pageX-t.pageX;return Math.atan2(r,i)*180/Math.PI},getDirection:function(t,r){var i=Math.abs(t.pageX-r.pageX),s=Math.abs(t.pageY-r.pageY);return i>=s?t.pageX-r.pageX>0?n.DIRECTION_LEFT:n.DIRECTION_RIGHT:t.pageY-r.pageY>0?n.DIRECTION_UP:n.DIRECTION_DOWN},getDistance:function(t,n){var r=n.pageX-t.pageX,i=n.pageY-t.pageY;return Math.sqrt(r*r+i*i)},getScale:function(t,n){return t.length>=2&&n.length>=2?this.getDistance(n[0],n[1])/this.getDistance(t[0],t[1]):1},getRotation:function(t,n){return t.length>=2&&n.length>=2?this.getAngle(n[1],n[0])-this.getAngle(t[1],t[0]):0},isVertical:function(t){return t==n.DIRECTION_UP||t==n.DIRECTION_DOWN},stopDefaultBrowserBehavior:function(t,n){var r,i=["webkit","khtml","moz","ms","o",""];if(!n||!t.style)return;for(var s=0;s<i.length;s++)for(var o in n)n.hasOwnProperty(o)&&(r=o,i[s]&&(r=i[s]+r.substring(0,1).toUpperCase()+r.substring(1)),t.style[r]=n[o]);n.userSelect=="none"&&(t.onselectstart=function(){return!1})}},n.detection={gestures:[],current:null,previous:null,stopped:!1,startDetect:function(t,r){if(this.current)return;this.stopped=!1,this.current={inst:t,startEvent:n.utils.extend({},r),lastEvent:!1,name:""},this.detect(r)},detect:function(t){if(!this.current||this.stopped)return;t=this.extendEventData(t);var r=this.current.inst.options;for(var i=0,s=this.gestures.length;i<s;i++){var o=this.gestures[i];if(!this.stopped&&r[o.name]!==!1&&o.handler.call(o,t,this.current.inst)===!1){this.stopDetect();break}}return this.current&&(this.current.lastEvent=t),t.eventType==n.EVENT_END&&!t.touches.length-1&&this.stopDetect(),t},stopDetect:function(){this.previous=n.utils.extend({},this.current),this.current=null,this.stopped=!0},extendEventData:function(t){var r=this.current.startEvent;if(r&&(t.touches.length!=r.touches.length||t.touches===r.touches)){r.touches=[];for(var i=0,s=t.touches.length;i<s;i++)r.touches.push(n.utils.extend({},t.touches[i]))}var o=t.timeStamp-r.timeStamp,u=t.center.pageX-r.center.pageX,a=t.center.pageY-r.center.pageY,f=n.utils.getVelocity(o,u,a);return n.utils.extend(t,{deltaTime:o,deltaX:u,deltaY:a,velocityX:f.x,velocityY:f.y,distance:n.utils.getDistance(r.center,t.center),angle:n.utils.getAngle(r.center,t.center),direction:n.utils.getDirection(r.center,t.center),scale:n.utils.getScale(r.touches,t.touches),rotation:n.utils.getRotation(r.touches,t.touches),startEvent:r}),t},register:function(r){var i=r.defaults||{};return i[r.name]===t&&(i[r.name]=!0),n.utils.extend(n.defaults,i,!0),r.index=r.index||1e3,this.gestures.push(r),this.gestures.sort(function(e,t){return e.index<t.index?-1:e.index>t.index?1:0}),this.gestures}},n.gestures=n.gestures||{},n.gestures.Hold={name:"hold",index:10,defaults:{hold_timeout:500,hold_threshold:1},timer:null,handler:function(t,r){switch(t.eventType){case n.EVENT_START:clearTimeout(this.timer),n.detection.current.name=this.name,this.timer=setTimeout(function(){n.detection.current.name=="hold"&&r.trigger("hold",t)},r.options.hold_timeout);break;case n.EVENT_MOVE:t.distance>r.options.hold_threshold&&clearTimeout(this.timer);break;case n.EVENT_END:clearTimeout(this.timer)}}},n.gestures.Tap={name:"tap",index:100,defaults:{tap_max_touchtime:250,tap_max_distance:10,tap_always:!0,doubletap_distance:20,doubletap_interval:300},handler:function(t,r){if(t.eventType==n.EVENT_END){var i=n.detection.previous,s=!1;if(t.deltaTime>r.options.tap_max_touchtime||t.distance>r.options.tap_max_distance)return;i&&i.name=="tap"&&t.timeStamp-i.lastEvent.timeStamp<r.options.doubletap_interval&&t.distance<r.options.doubletap_distance&&(r.trigger("doubletap",t),s=!0);if(!s||r.options.tap_always)n.detection.current.name="tap",r.trigger(n.detection.current.name,t)}}},n.gestures.Swipe={name:"swipe",index:40,defaults:{swipe_max_touches:1,swipe_velocity:.7},handler:function(t,r){if(t.eventType==n.EVENT_END){if(r.options.swipe_max_touches>0&&t.touches.length>r.options.swipe_max_touches)return;if(t.velocityX>r.options.swipe_velocity||t.velocityY>r.options.swipe_velocity)r.trigger(this.name,t),r.trigger(this.name+t.direction,t)}}},n.gestures.Drag={name:"drag",index:50,defaults:{drag_min_distance:10,drag_max_touches:1,drag_block_horizontal:!1,drag_block_vertical:!1,drag_lock_to_axis:!1,drag_lock_min_distance:25},triggered:!1,handler:function(t,r){if(n.detection.current.name!=this.name&&this.triggered){r.trigger(this.name+"end",t),this.triggered=!1;return}if(r.options.drag_max_touches>0&&t.touches.length>r.options.drag_max_touches)return;switch(t.eventType){case n.EVENT_START:this.triggered=!1;break;case n.EVENT_MOVE:if(t.distance<r.options.drag_min_distance&&n.detection.current.name!=this.name)return;n.detection.current.name=this.name;if(n.detection.current.lastEvent.drag_locked_to_axis||r.options.drag_lock_to_axis&&r.options.drag_lock_min_distance<=t.distance)t.drag_locked_to_axis=!0;var i=n.detection.current.lastEvent.direction;t.drag_locked_to_axis&&i!==t.direction&&(n.utils.isVertical(i)?t.direction=t.deltaY<0?n.DIRECTION_UP:n.DIRECTION_DOWN:t.direction=t.deltaX<0?n.DIRECTION_LEFT:n.DIRECTION_RIGHT),this.triggered||(r.trigger(this.name+"start",t),this.triggered=!0),r.trigger(this.name,t),r.trigger(this.name+t.direction,t),(r.options.drag_block_vertical&&n.utils.isVertical(t.direction)||r.options.drag_block_horizontal&&!n.utils.isVertical(t.direction))&&t.preventDefault();break;case n.EVENT_END:this.triggered&&r.trigger(this.name+"end",t),this.triggered=!1}}},n.gestures.Transform={name:"transform",index:45,defaults:{transform_min_scale:.01,transform_min_rotation:1,transform_always_block:!1},triggered:!1,handler:function(t,r){if(n.detection.current.name!=this.name&&this.triggered){r.trigger(this.name+"end",t),this.triggered=!1;return}if(t.touches.length<2)return;r.options.transform_always_block&&t.preventDefault();switch(t.eventType){case n.EVENT_START:this.triggered=!1;break;case n.EVENT_MOVE:var i=Math.abs(1-t.scale),s=Math.abs(t.rotation);if(i<r.options.transform_min_scale&&s<r.options.transform_min_rotation)return;n.detection.current.name=this.name,this.triggered||(r.trigger(this.name+"start",t),this.triggered=!0),r.trigger(this.name,t),s>r.options.transform_min_rotation&&r.trigger("rotate",t),i>r.options.transform_min_scale&&(r.trigger("pinch",t),r.trigger("pinch"+(t.scale<1?"in":"out"),t));break;case n.EVENT_END:this.triggered&&r.trigger(this.name+"end",t),this.triggered=!1}}},n.gestures.Touch={name:"touch",index:-Infinity,defaults:{prevent_default:!1,prevent_mouseevents:!1},handler:function(t,r){if(r.options.prevent_mouseevents&&t.pointerType==n.POINTER_MOUSE){t.stopDetect();return}r.options.prevent_default&&t.preventDefault(),t.eventType==n.EVENT_START&&r.trigger(this.name,t)}},n.gestures.Release={name:"release",index:Infinity,handler:function(t,r){t.eventType==n.EVENT_END&&r.trigger(this.name,t)}},typeof module=="object"&&typeof module.exports=="object"?module.exports=n:(e.Hammer=n,typeof e.define=="function"&&e.define.amd&&e.define("hammer",[],function(){return n}))})(this),function(){var e=this,t=e._,n={},r=Array.prototype,i=Object.prototype,s=Function.prototype,o=r.push,u=r.slice,a=r.concat,f=i.toString,l=i.hasOwnProperty,c=r.forEach,h=r.map,p=r.reduce,d=r.reduceRight,v=r.filter,m=r.every,g=r.some,y=r.indexOf,b=r.lastIndexOf,w=Array.isArray,E=Object.keys,S=s.bind,x=function(e){if(e instanceof x)return e;if(!(this instanceof x))return new x(e);this._wrapped=e};typeof exports!="undefined"?(typeof module!="undefined"&&module.exports&&(exports=module.exports=x),exports._=x):e._=x,x.VERSION="1.5.2";var T=x.each=x.forEach=function(e,t,r){if(e==null)return;if(c&&e.forEach===c)e.forEach(t,r);else if(e.length===+e.length){for(var i=0,s=e.length;i<s;i++)if(t.call(r,e[i],i,e)===n)return}else{var o=x.keys(e);for(var i=0,s=o.length;i<s;i++)if(t.call(r,e[o[i]],o[i],e)===n)return}};x.map=x.collect=function(e,t,n){var r=[];return e==null?r:h&&e.map===h?e.map(t,n):(T(e,function(e,i,s){r.push(t.call(n,e,i,s))}),r)};var N="Reduce of empty array with no initial value";x.reduce=x.foldl=x.inject=function(e,t,n,r){var i=arguments.length>2;e==null&&(e=[]);if(p&&e.reduce===p)return r&&(t=x.bind(t,r)),i?e.reduce(t,n):e.reduce(t);T(e,function(e,s,o){i?n=t.call(r,n,e,s,o):(n=e,i=!0)});if(!i)throw new TypeError(N);return n},x.reduceRight=x.foldr=function(e,t,n,r){var i=arguments.length>2;e==null&&(e=[]);if(d&&e.reduceRight===d)return r&&(t=x.bind(t,r)),i?e.reduceRight(t,n):e.reduceRight(t);var s=e.length;if(s!==+s){var o=x.keys(e);s=o.length}T(e,function(u,a,f){a=o?o[--s]:--s,i?n=t.call(r,n,e[a],a,f):(n=e[a],i=!0)});if(!i)throw new TypeError(N);return n},x.find=x.detect=function(e,t,n){var r;return C(e,function(e,i,s){if(t.call(n,e,i,s))return r=e,!0}),r},x.filter=x.select=function(e,t,n){var r=[];return e==null?r:v&&e.filter===v?e.filter(t,n):(T(e,function(e,i,s){t.call(n,e,i,s)&&r.push(e)}),r)},x.reject=function(e,t,n){return x.filter(e,function(e,r,i){return!t.call(n,e,r,i)},n)},x.every=x.all=function(e,t,r){t||(t=x.identity);var i=!0;return e==null?i:m&&e.every===m?e.every(t,r):(T(e,function(e,s,o){if(!(i=i&&t.call(r,e,s,o)))return n}),!!i)};var C=x.some=x.any=function(e,t,r){t||(t=x.identity);var i=!1;return e==null?i:g&&e.some===g?e.some(t,r):(T(e,function(e,s,o){if(i||(i=t.call(r,e,s,o)))return n}),!!i)};x.contains=x.include=function(e,t){return e==null?!1:y&&e.indexOf===y?e.indexOf(t)!=-1:C(e,function(e){return e===t})},x.invoke=function(e,t){var n=u.call(arguments,2),r=x.isFunction(t);return x.map(e,function(e){return(r?t:e[t]).apply(e,n)})},x.pluck=function(e,t){return x.map(e,function(e){return e[t]})},x.where=function(e,t,n){return x.isEmpty(t)?n?void 0:[]:x[n?"find":"filter"](e,function(e){for(var n in t)if(t[n]!==e[n])return!1;return!0})},x.findWhere=function(e,t){return x.where(e,t,!0)},x.max=function(e,t,n){if(!t&&x.isArray(e)&&e[0]===+e[0]&&e.length<65535)return Math.max.apply(Math,e);if(!t&&x.isEmpty(e))return-Infinity;var r={computed:-Infinity,value:-Infinity};return T(e,function(e,i,s){var o=t?t.call(n,e,i,s):e;o>r.computed&&(r={value:e,computed:o})}),r.value},x.min=function(e,t,n){if(!t&&x.isArray(e)&&e[0]===+e[0]&&e.length<65535)return Math.min.apply(Math,e);if(!t&&x.isEmpty(e))return Infinity;var r={computed:Infinity,value:Infinity};return T(e,function(e,i,s){var o=t?t.call(n,e,i,s):e;o<r.computed&&(r={value:e,computed:o})}),r.value},x.shuffle=function(e){var t,n=0,r=[];return T(e,function(e){t=x.random(n++),r[n-1]=r[t],r[t]=e}),r},x.sample=function(e,t,n){return arguments.length<2||n?e[x.random(e.length-1)]:x.shuffle(e).slice(0,Math.max(0,t))};var k=function(e){return x.isFunction(e)?e:function(t){return t[e]}};x.sortBy=function(e,t,n){var r=k(t);return x.pluck(x.map(e,function(e,t,i){return{value:e,index:t,criteria:r.call(n,e,t,i)}}).sort(function(e,t){var n=e.criteria,r=t.criteria;if(n!==r){if(n>r||n===void 0)return 1;if(n<r||r===void 0)return-1}return e.index-t.index}),"value")};var L=function(e){return function(t,n,r){var i={},s=n==null?x.identity:k(n);return T(t,function(n,o){var u=s.call(r,n,o,t);e(i,u,n)}),i}};x.groupBy=L(function(e,t,n){(x.has(e,t)?e[t]:e[t]=[]).push(n)}),x.indexBy=L(function(e,t,n){e[t]=n}),x.countBy=L(function(e,t){x.has(e,t)?e[t]++:e[t]=1}),x.sortedIndex=function(e,t,n,r){n=n==null?x.identity:k(n);var i=n.call(r,t),s=0,o=e.length;while(s<o){var u=s+o>>>1;n.call(r,e[u])<i?s=u+1:o=u}return s},x.toArray=function(e){return e?x.isArray(e)?u.call(e):e.length===+e.length?x.map(e,x.identity):x.values(e):[]},x.size=function(e){return e==null?0:e.length===+e.length?e.length:x.keys(e).length},x.first=x.head=x.take=function(e,t,n){return e==null?void 0:t==null||n?e[0]:u.call(e,0,t)},x.initial=function(e,t,n){return u.call(e,0,e.length-(t==null||n?1:t))},x.last=function(e,t,n){return e==null?void 0:t==null||n?e[e.length-1]:u.call(e,Math.max(e.length-t,0))},x.rest=x.tail=x.drop=function(e,t,n){return u.call(e,t==null||n?1:t)},x.compact=function(e){return x.filter(e,x.identity)};var A=function(e,t,n){return t&&x.every(e,x.isArray)?a.apply(n,e):(T(e,function(e){x.isArray(e)||x.isArguments(e)?t?o.apply(n,e):A(e,t,n):n.push(e)}),n)};x.flatten=function(e,t){return A(e,t,[])},x.without=function(e){return x.difference(e,u.call(arguments,1))},x.uniq=x.unique=function(e,t,n,r){x.isFunction(t)&&(r=n,n=t,t=!1);var i=n?x.map(e,n,r):e,s=[],o=[];return T(i,function(n,r){if(t?!r||o[o.length-1]!==n:!x.contains(o,n))o.push(n),s.push(e[r])}),s},x.union=function(){return x.uniq(x.flatten(arguments,!0))},x.intersection=function(e){var t=u.call(arguments,1);return x.filter(x.uniq(e),function(e){return x.every(t,function(t){return x.indexOf(t,e)>=0})})},x.difference=function(e){var t=a.apply(r,u.call(arguments,1));return x.filter(e,function(e){return!x.contains(t,e)})},x.zip=function(){var e=x.max(x.pluck(arguments,"length").concat(0)),t=new Array(e);for(var n=0;n<e;n++)t[n]=x.pluck(arguments,""+n);return t},x.object=function(e,t){if(e==null)return{};var n={};for(var r=0,i=e.length;r<i;r++)t?n[e[r]]=t[r]:n[e[r][0]]=e[r][1];return n},x.indexOf=function(e,t,n){if(e==null)return-1;var r=0,i=e.length;if(n){if(typeof n!="number")return r=x.sortedIndex(e,t),e[r]===t?r:-1;r=n<0?Math.max(0,i+n):n}if(y&&e.indexOf===y)return e.indexOf(t,n);for(;r<i;r++)if(e[r]===t)return r;return-1},x.lastIndexOf=function(e,t,n){if(e==null)return-1;var r=n!=null;if(b&&e.lastIndexOf===b)return r?e.lastIndexOf(t,n):e.lastIndexOf(t);var i=r?n:e.length;while(i--)if(e[i]===t)return i;return-1},x.range=function(e,t,n){arguments.length<=1&&(t=e||0,e=0),n=arguments[2]||1;var r=Math.max(Math.ceil((t-e)/n),0),i=0,s=new Array(r);while(i<r)s[i++]=e,e+=n;return s};var O=function(){};x.bind=function(e,t){var n,r;if(S&&e.bind===S)return S.apply(e,u.call(arguments,1));if(!x.isFunction(e))throw new TypeError;return n=u.call(arguments,2),r=function(){if(this instanceof r){O.prototype=e.prototype;var i=new O;O.prototype=null;var s=e.apply(i,n.concat(u.call(arguments)));return Object(s)===s?s:i}return e.apply(t,n.concat(u.call(arguments)))}},x.partial=function(e){var t=u.call(arguments,1);return function(){return e.apply(this,t.concat(u.call(arguments)))}},x.bindAll=function(e){var t=u.call(arguments,1);if(t.length===0)throw new Error("bindAll must be passed function names");return T(t,function(t){e[t]=x.bind(e[t],e)}),e},x.memoize=function(e,t){var n={};return t||(t=x.identity),function(){var r=t.apply(this,arguments);return x.has(n,r)?n[r]:n[r]=e.apply(this,arguments)}},x.delay=function(e,t){var n=u.call(arguments,2);return setTimeout(function(){return e.apply(null,n)},t)},x.defer=function(e){return x.delay.apply(x,[e,1].concat(u.call(arguments,1)))},x.throttle=function(e,t,n){var r,i,s,o=null,u=0;n||(n={});var a=function(){u=n.leading===!1?0:new Date,o=null,s=e.apply(r,i)};return function(){var f=new Date;!u&&n.leading===!1&&(u=f);var l=t-(f-u);return r=this,i=arguments,l<=0?(clearTimeout(o),o=null,u=f,s=e.apply(r,i)):!o&&n.trailing!==!1&&(o=setTimeout(a,l)),s}},x.debounce=function(e,t,n){var r,i,s,o,u;return function(){s=this,i=arguments,o=new Date;var a=function(){var f=new Date-o;f<t?r=setTimeout(a,t-f):(r=null,n||(u=e.apply(s,i)))},f=n&&!r;return r||(r=setTimeout(a,t)),f&&(u=e.apply(s,i)),u}},x.once=function(e){var t=!1,n;return function(){return t?n:(t=!0,n=e.apply(this,arguments),e=null,n)}},x.wrap=function(e,t){return function(){var n=[e];return o.apply(n,arguments),t.apply(this,n)}},x.compose=function(){var e=arguments;return function(){var t=arguments;for(var n=e.length-1;n>=0;n--)t=[e[n].apply(this,t)];return t[0]}},x.after=function(e,t){return function(){if(--e<1)return t.apply(this,arguments)}},x.keys=E||function(e){if(e!==Object(e))throw new TypeError("Invalid object");var t=[];for(var n in e)x.has(e,n)&&t.push(n);return t},x.values=function(e){var t=x.keys(e),n=t.length,r=new Array(n);for(var i=0;i<n;i++)r[i]=e[t[i]];return r},x.pairs=function(e){var t=x.keys(e),n=t.length,r=new Array(n);for(var i=0;i<n;i++)r[i]=[t[i],e[t[i]]];return r},x.invert=function(e){var t={},n=x.keys(e);for(var r=0,i=n.length;r<i;r++)t[e[n[r]]]=n[r];return t},x.functions=x.methods=function(e){var t=[];for(var n in e)x.isFunction(e[n])&&t.push(n);return t.sort()},x.extend=function(e){return T(u.call(arguments,1),function(t){if(t)for(var n in t)e[n]=t[n]}),e},x.pick=function(e){var t={},n=a.apply(r,u.call(arguments,1));return T(n,function(n){n in e&&(t[n]=e[n])}),t},x.omit=function(e){var t={},n=a.apply(r,u.call(arguments,1));for(var i in e)x.contains(n,i)||(t[i]=e[i]);return t},x.defaults=function(e){return T(u.call(arguments,1),function(t){if(t)for(var n in t)e[n]===void 0&&(e[n]=t[n])}),e},x.clone=function(e){return x.isObject(e)?x.isArray(e)?e.slice():x.extend({},e):e},x.tap=function(e,t){return t(e),e};var M=function(e,t,n,r){if(e===t)return e!==0||1/e==1/t;if(e==null||t==null)return e===t;e instanceof x&&(e=e._wrapped),t instanceof x&&(t=t._wrapped);var i=f.call(e);if(i!=f.call(t))return!1;switch(i){case"[object String]":return e==String(t);case"[object Number]":return e!=+e?t!=+t:e==0?1/e==1/t:e==+t;case"[object Date]":case"[object Boolean]":return+e==+t;case"[object RegExp]":return e.source==t.source&&e.global==t.global&&e.multiline==t.multiline&&e.ignoreCase==t.ignoreCase}if(typeof e!="object"||typeof t!="object")return!1;var s=n.length;while(s--)if(n[s]==e)return r[s]==t;var o=e.constructor,u=t.constructor;if(o!==u&&!(x.isFunction(o)&&o instanceof o&&x.isFunction(u)&&u instanceof u))return!1;n.push(e),r.push(t);var a=0,l=!0;if(i=="[object Array]"){a=e.length,l=a==t.length;if(l)while(a--)if(!(l=M(e[a],t[a],n,r)))break}else{for(var c in e)if(x.has(e,c)){a++;if(!(l=x.has(t,c)&&M(e[c],t[c],n,r)))break}if(l){for(c in t)if(x.has(t,c)&&!(a--))break;l=!a}}return n.pop(),r.pop(),l};x.isEqual=function(e,t){return M(e,t,[],[])},x.isEmpty=function(e){if(e==null)return!0;if(x.isArray(e)||x.isString(e))return e.length===0;for(var t in e)if(x.has(e,t))return!1;return!0},x.isElement=function(e){return!!e&&e.nodeType===1},x.isArray=w||function(e){return f.call(e)=="[object Array]"},x.isObject=function(e){return e===Object(e)},T(["Arguments","Function","String","Number","Date","RegExp"],function(e){x["is"+e]=function(t){return f.call(t)=="[object "+e+"]"}}),x.isArguments(arguments)||(x.isArguments=function(e){return!!e&&!!x.has(e,"callee")}),typeof /./!="function"&&(x.isFunction=function(e){return typeof e=="function"}),x.isFinite=function(e){return isFinite(e)&&!isNaN(parseFloat(e))},x.isNaN=function(e){return x.isNumber(e)&&e!=+e},x.isBoolean=function(e){return e===!0||e===!1||f.call(e)=="[object Boolean]"},x.isNull=function(e){return e===null},x.isUndefined=function(e){return e===void 0},x.has=function(e,t){return l.call(e,t)},x.noConflict=function(){return e._=t,this},x.identity=function(e){return e},x.times=function(e,t,n){var r=Array(Math.max(0,e));for(var i=0;i<e;i++)r[i]=t.call(n,i);return r},x.random=function(e,t){return t==null&&(t=e,e=0),e+Math.floor(Math.random()*(t-e+1))};var _={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;"}};_.unescape=x.invert(_.escape);var D={escape:new RegExp("["+x.keys(_.escape).join("")+"]","g"),unescape:new RegExp("("+x.keys(_.unescape).join("|")+")","g")};x.each(["escape","unescape"],function(e){x[e]=function(t){return t==null?"":(""+t).replace(D[e],function(t){return _[e][t]})}}),x.result=function(e,t){if(e==null)return void 0;var n=e[t];return x.isFunction(n)?n.call(e):n},x.mixin=function(e){T(x.functions(e),function(t){var n=x[t]=e[t];x.prototype[t]=function(){var e=[this._wrapped];return o.apply(e,arguments),F.call(this,n.apply(x,e))}})};var P=0;x.uniqueId=function(e){var t=++P+"";return e?e+t:t},x.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var H=/(.)^/,B={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},j=/\\|'|\r|\n|\t|\u2028|\u2029/g;x.template=function(e,t,n){var r;n=x.defaults({},n,x.templateSettings);var i=new RegExp([(n.escape||H).source,(n.interpolate||H).source,(n.evaluate||H).source].join("|")+"|$","g"),s=0,o="__p+='";e.replace(i,function(t,n,r,i,u){return o+=e.slice(s,u).replace(j,function(e){return"\\"+B[e]}),n&&(o+="'+\n((__t=("+n+"))==null?'':_.escape(__t))+\n'"),r&&(o+="'+\n((__t=("+r+"))==null?'':__t)+\n'"),i&&(o+="';\n"+i+"\n__p+='"),s=u+t.length,t}),o+="';\n",n.variable||(o="with(obj||{}){\n"+o+"}\n"),o="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+o+"return __p;\n";try{r=new Function(n.variable||"obj","_",o)}catch(u){throw u.source=o,u}if(t)return r(t,x);var a=function(e){return r.call(this,e,x)};return a.source="function("+(n.variable||"obj")+"){\n"+o+"}",a},x.chain=function(e){return x(e).chain()};var F=function(e){return this._chain?x(e).chain():e};x.mixin(x),T(["pop","push","reverse","shift","sort","splice","unshift"],function(e){var t=r[e];x.prototype[e]=function(){var n=this._wrapped;return t.apply(n,arguments),(e=="shift"||e=="splice")&&n.length===0&&delete n[0],F.call(this,n)}}),T(["concat","join","slice"],function(e){var t=r[e];x.prototype[e]=function(){return F.call(this,t.apply(this._wrapped,arguments))}}),x.extend(x.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}})}.call(this),function(){function i(){var r=e.scrollTop,i=r+n;t.filter(function(e){return e.dataset.bottom>=r&&e.dataset.top<=i&&!e.dataset.inited}).forEach(function(e){e.dataset.inited=!0,s(e)})}function s(e){var t=$one(".line__photos",e),n=$all(".line__photo",e),i=Hammer(t,{prevent_mouseevents:!0,drag_lock_to_axis:!0,swipe_velocity:.5}),s=n.length*r,l=0;for(var c=0;c<n.length&&c<2;c++)f(n[c]);i.on("dragleft dragright",function(e){e.gesture.preventDefault(),u(t);var n=l+e.gesture.deltaX,r="translate("+n+"px, 0)";t.style.webkitTransform=r}),i.on("release swipeleft swiperight",function(e){e.gesture.preventDefault(),e.gesture.stopDetect(),u(t);if(e.type=="swipeleft"||e.type=="swiperight"||Math.abs(e.gesture.deltaX)>r/2)l+=e.gesture.deltaX<0?-r:r,l=Math.max(-s+r,l),l=Math.min(l,0);o(t,l),a(n,l)})}function o(e,t){var n="translate("+t+"px, 0)";e.style.webkitTransition="-webkit-transform .3s",e.style.webkitTransform=n,e.dataset.timer=setTimeout(function(){u(e)},333)}function u(e){e.style.webkitTransition="none",clearTimeout(e.dataset.timer),e.dataset.timer=null}function a(e,t){var n=-t/r,i=e[n+1];i&&!i.dataset.loaded&&f(i)}function f(e){var t=e.dataset.src;e.dataset.loaded=!0,l(t,function(t){e.style.backgroundImage="url("+t.src+")",e.classList.remove("line__photo_loading")})}function l(e,t){var n=document.createElement("img");n.onload=function(){t(n)},n.src=e}var e=$one(".line"),t=$all(".line__section"),n=e.offsetHeight,r=e.offsetWidth;t.forEach(function(e){e.dataset.top=e.offsetTop,e.dataset.bottom=e.offsetTop+e.offsetHeight}),$on(e,"scroll",_.debounce(i,50)),$on(window,"resize",function(){n=e.offsetHeight,r=e.offsetWidth}),i()}()