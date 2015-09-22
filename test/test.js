'use strict'

require ( 'chai' )
.should ()

const elapsed = require ( '../lib/elapsed' )
const Continuous = require ( '../lib/Continuous' )
const lib = require ( '../lib/index' )

describe
('util'
, function ()
  { it
    ( 'should export elapsed'
    , function ()
      { lib.elapsed
        .should.equal ( elapsed )
      }
    )

    it
    ( 'should export Continuous'
    , function ()
      { lib.Continuous
        .should.equal ( Continuous )
      }
    )
  }
)


