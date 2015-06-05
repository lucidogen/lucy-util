/*
  # elapsed

  Returns the elapsed time in seconds since application start.
*/
'use strict'

let TIME_SOURCE
if (global.window) {
  TIME_SOURCE = global.window.performance
} else {
  TIME_SOURCE = Date
}

const now = function() {
  return TIME_SOURCE.now() / 1000
}

const ref = now()

module.exports = function() {
  return now() - ref
}
