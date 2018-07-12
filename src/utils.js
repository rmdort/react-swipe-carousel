/**
 * Smooth scroll to an element in the DOM
 */
export function smoothScroll (
  element,
  target,
  duration = 300,
  direction = 'horizontal'
) {
  target = Math.round(target)
  duration = Math.round(duration)
  const scrollDir = direction === 'vertical' ? 'scrollTop' : 'scrollLeft'
  if (duration < 0) {
    return Promise.reject('bad duration')
  }
  if (duration === 0) {
    element[scrollDir] = target
    return Promise.resolve()
  }

  var start_time = Date.now()
  var end_time = start_time + duration
  var start_top = element[scrollDir]
  var distance = target - start_top

  // based on http://en.wikipedia.org/wiki/Smoothstep
  var smooth_step = function (start, end, point) {
    if (point <= start) return 0
    if (point >= end) return 1
    var x = (point - start) / (end - start) // interpolation
    return x * x * (3 - 2 * x)
  }

  return new Promise(function (resolve, reject) {
    // This is to keep track of where the element's scrollTop is
    // supposed to be, based on what we're doing
    var previous_top = element[scrollDir]

    // This is like a think function from a game loop
    var scroll_frame = function () {
      if (element[scrollDir] != previous_top) return

      // set the scrollTop for this frame
      var now = Date.now()
      var point = smooth_step(start_time, end_time, now)
      var frameTop = Math.round(start_top + distance * point)
      element[scrollDir] = frameTop

      // check if we're done!
      if (now >= end_time) return resolve()

      // If we were supposed to scroll but didn't, then we
      // probably hit the limit, so consider it done; not
      // interrupted.
      if (
        element[scrollDir] === previous_top &&
        element[scrollDir] !== frameTop
      ) {
        return resolve()
      }
      previous_top = element[scrollDir]

      // schedule next frame for execution
      window.requestAnimationFrame(scroll_frame)
    }

    // boostrap the animation process
    window.requestAnimationFrame(scroll_frame)
  })
}
