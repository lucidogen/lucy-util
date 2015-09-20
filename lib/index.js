/*
  # Lucidity utility functions and classes

  ## util.elapsed

  Returns the elapsed time since application start in seconds.

  ## util.Continuous

  Transform a discrete progression into a continous (time
  based) value.
*/
'use strict'

module.exports = 
{ VERSION:              '0.2.0'
, Continuous: require ( './Continuous' )
, elapsed:    require ( './elapsed'    )
, dirsum:     require ( './dirsum'     )
}
