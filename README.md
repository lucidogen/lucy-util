# Lucy util [![Build Status](https://travis-ci.org/lucidogen/lucy-util.svg)](https://travis-ci.org/lucidogen/lucy-util)

Part of [Lucidity](http://lucidity.io) project.

Utility functions and helper classes.

## Installation

Currently only works with [**io.js**](https://iojs.org).

  ```sh
  npm install lucy-util --save
  ```

## util.elapsed()

Returns elapsed time since application start in secondes.

  ```js
  const util = require ( 'lucy-util' )

  console.log ( util.elapsed () )
  ```

## util.Continuous

When a value is regularly updated by an external source (midi sync, osc
messages, etc) the value 'jumps' every time. This transforms a discrete value
change to a continuous, smooth value. The most important option is the
'stiffness'. With a value of '1', the jitter in setting value is not smoothed
out. With lower values, the returned value is smoothed.

  ```js
  const util = require ( 'lucy-util' )
  let foo = new util.Continuous ( 0.8 ) // smooth follower

  // external (example midi sync)
  foo.setValue ( 1.0, util.elapsed () - deltaTime / 1000 )

  // read
  console.log ( 'foo is now', foo.value () )

  // or, to have the same timestamp used for different values
  console.log ('foo is now', foo.value ( someApp.now ) )
  ```

## Tests

  ```sh
   npm test
  ```

## Contributing

Please use ['jessy style'](http://github.com/lucidogen/jessy).

Add unit tests for any new or changed functionality.

## Release History

  * 0.1.1 (2015-09-02) Fixed main index file.
  * 0.1.0 (2015-09-02) Initial release.
