'use strict'

require ( 'chai' )
.should ()

const Continuous = require ( '../lib/Continuous' )

describe
( 'util.Continuous'
, function ()
  { describe
    ( '#new'
    , function ()
      { it
        ( 'should return an instance of Continuous'
        , function ()
          { let s = new Continuous ()
            s.should.be.an.instanceof ( Continuous )
            s.value ()
            .should.equal ( 0.0 )
          }
        )
      }
    )

    describe
    ( '#setValue'
    , function()
      { it
        ( 'should set current value immediately'
        , function()
          { let s = new Continuous ()
            s.setValue ( 1.23 )
            s.value ()
            .should.equal ( 1.23 )
          }
        )
      }
    )

    describe
    ( 'smoothing'
    , function ()
      { it
        ( 'should smooth values'
        , function ()
          { let s = new Continuous ( 0.5 )
            s.value ()
            .should.equal ( 0.0 )
            // set first value
            s.setValue ( 1.0, 10 )
            // value after 1.0 s
            s.value ( 11 )
            .should.equal ( 1.0 )
            // no change with time
            s.value ( 13 )
            .should.equal ( 1.0 )
            // set second value at time 20
            s.setValue ( 2.0, 20 )

            // Changes with time ( speed = 0.1 )
            s.value ( 22 )
            .should.equal ( 2.2 )

            // New value, new speed = 0.05
            s.setValue ( 2.5, 30 )

            // On get value, update speed with impulse
            s.value ( 35 )
            .should.be.within ( 3.217, 3.218 )
          }
        )

        it
        ( 'should allow loop jump'
        , function ()
          { let s = new Continuous ()
            s.setValue ( 1.0, 10 )
            s.setValue ( 2.0, 20 )
            s.value ( 30 )
            .should.equal ( 3.0 )
            s.setValue ( 3.0, 30 )

            s.value ( 30 )
            .should.equal ( 3.0 )
            s.value ( 35 )
            .should.equal ( 3.5 )
            
            // and now we jump from 40 to 0 ( modulo 4.0 )
            s.setValue ( 0.0, 40 )
            s.value ( 40 )
            .should.equal ( 0.0 )
            s.value ( 45 )
            .should.equal ( 0.5 )
          }
        )
      }
    )
  }
)

