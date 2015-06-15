/*
  # Continuous

  Transform a discrete progression into a continous (time
  based) value.

  The discrete count value can jump back or forward. When a
  jump (speed change larger then 2x) occurs, we do not update
  speed immediately: we wait for progression to stabilize (have
  at least two steps with speed changes under 2x.

*/
'use strict'
const elapsed = require('./elapsed')
  
// Return the current beat value
const getValue = function(time_ref) {
  if (this.stopped) return this.svalue
  time_ref = elapsed()


  let dt = time_ref - this.svalue_ref
  this.svalue_ref = time_ref

  // compute new speed
  if (this.impulse > 0) {
    // speed is slower the sspeed
    if (this.speed < this.sspeed) {
      // do not allow overshoot
      this.speed += this.impulse * dt
    }
    this.impulse *= 0.999 // friction
  } else {
    if (this.speed > this.sspeed) {
      // do not allow overshoot
      this.speed += this.impulse * dt
    }
    this.impulse *= 0.999
  }

  this.svalue += this.speed * dt
  //console.log(this.svalue)
  return this.svalue
}

// This method is called by the discrete counter to set current value. Optional
// `time_ref` can be used to set current time reference. Default is
// elapsed().
const setValue = function(value, time_ref) {
  time_ref = elapsed()
  // Compute new speed.
  let dt = time_ref - this.svalue2_ref
  let speed = (value - this.svalue2) / dt
  if (speed < 0) {
    this.svalue = value
  } else if (Math.abs(speed - this.sspeed) > 4 || dt < 0) { // why would dt be smaller then 0 ?
    // jump to value
    this.svalue = value
    this.sspeed = speed
    this.speed  = speed
    this.impulse = 0
    console.log('dt ' + dt + ' SVALUE ' + this.svalue + ' VALUE ' + value + ' IMPULSE ' + this.impulse + ' SSPEED ' + this.sspeed + ' SPEED ' + this.speed + ' let speed ' + speed)
  } else {
    this.sspeed = speed
    this.impulse = (this.sspeed - this.speed) / dt
  }

  // Store discrete value and time ref to compute
  // next impulse
  this.svalue2 = value
  this.svalue2_ref = time_ref
  // this.svalue = value
  // this.svalue_ref = time_ref
}

const setFirstValue = function(value, time_ref) {
  this.svalue = value
  this.svalue_ref = time_ref || elapsed()
  this.setValue = setSecondValue
}

const setSecondValue = function(value, time_ref) {
  time_ref = time_ref || elapsed()
  let dt = time_ref - this.svalue_ref 
  this.speed = (value - this.svalue) / dt
  this.sspeed = this.speed
  this.svalue = value
  this.svalue_ref = time_ref
  this.setValue = setValue
  this.value = getValue
}

const getFirstValues = function() {
  return this.svalue
}

const Continuous = function() {
  // Discrete value
  this.svalue      = 0
  // Time at which last discrete svalue was set
  this.svalue_ref  = 0
  // Current discrete value progression speed
  this.speed       = null
  // Start stopped so that we just return 0 on value query
  // before speed and value are first set.
  this.stopped = null
  
  this.setValue = setFirstValue
  this.value    = getFirstValues
}

module.exports = Continuous

// Move value forward `dv`.
Continuous.prototype.addValue = function(dv, time_ref) {
  this.setValue(this.svalue + dv, time_ref)
}

// Stop advancing value with time.
Continuous.prototype.stop = function() {
  this.stopped = true
}

// Start advancing value with time again. Mark current time as equal to current
// value.
Continuous.prototype.start = function(time_ref) {
  this.stopped = false
  this.svalue_ref = time_ref || elapsed()
}
