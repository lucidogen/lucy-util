'use strict'

// TODO: Use tween.js ?

const ATAN_LOW  = Math.atan ( -10 ),
      ATAN_DIST = Math.atan ( 10 ) - Math.atan ( -10 )

const CURVES =
{ linear: false // no transform
//  -- From 0 to pi/2
, half_sin ( dt, duration )
  { let n = Math.PI * dt / duration / 2
    return Math.sin ( n ) * duration
  }
//  -- From -pi/2 to pi/2
, sin ( dt, duration )
  { let n = Math.PI *  ( -0.5 + dt / duration )
    return ( 0.5 + 0.5 * Math.sin ( n ) ) * duration
  }
, powsin ( dt, duration )
  { let n = Math.PI *  ( -0.5 + dt / duration )
    return Math.pow
    ( ( 0.5 + 0.5 * Math.sin ( n ) )
    , 4
    ) * duration
  }
, atan ( dt, duration )
  { // -10 --> 10
    let n = -10 + 20 * dt / duration
    return ( Math.atan ( n ) - ATAN_LOW ) * duration / ATAN_DIST
  }
}    

const Smoother = function ( origin, duration, curve, target )
{ this.duration = ( duration == undefined ? 0.2 : duration ) // 0.2 [s] default
  this.curve    = CURVES[curve || 'linear']
  this.value    = ( origin == undefined ? 0 : origin )
  this.origin   = this.value
  this.target   = ( target == undefined ? this.origin : target )
  this.time_ref = TimeRefMono ()
}
module.exports = Smoother

Smoother.prototype =
{ update ( time_ref )
  { if ( this.value == this.target )
    { // done
    }
    else
    { let dt = time_ref - this.time_ref
      if ( dt > this.duration || this.duration == 0 )
      { // done
        this.value = this.target
      }
      else
      { // non-linear progression
        if ( this.curve )
        { dt = this.curve ( dt, this.duration )
        }
        this.value = this.origin + this.speed * dt
      }
    }
    return this.value
  }

, set ( v, time_ref )
  { this.origin = this.value
    this.target = v
    if ( this.duration )
    { this.speed =  ( this.target - this.origin ) / this.duration
    }
    this.time_ref = time_ref || TimeRefMono ()
  }
}

