'use strict'

require('chai').should()

const elapsed = require('../lib/elapsed')

describe('util.elapsed()', function() {
  it('should return a float', function() {
    elapsed().should.be.a.float
  })

  it('should count time in seconds', function(done) {
    let start = elapsed()
    setTimeout(function() {
      let diff = elapsed() - start
      diff.should.be.above(0.015)
      diff.should.be.below(0.025)
      done()
    }, 20)
  })
})

