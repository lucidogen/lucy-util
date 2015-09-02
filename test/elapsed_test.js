'use strict'

require ( 'chai' )
.should ()

const elapsed = require ( '../lib/elapsed' )

describe
('util.elapsed ()'
, function ()
  { it
    ( 'should return a float'
    , function ()
      { elapsed ()
        .should.be.a.float
      }
    )

    it
    ( 'should count time in seconds'
    , function ( done )
      { let start = elapsed ()
        let now = Date.now ()
        setTimeout
        ( function ()
          { let diff = elapsed () - start
            let mes  = ( Date.now () - now ) / 1000
            diff
            .should.be.within ( mes - 0.01, mes + 0.01 )
            done ()
          }
        , 2
        )
      }
    )
  }
)

