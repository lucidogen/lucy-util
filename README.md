# Lucy util

## Utility functions and classes for Lucidity

## util.elapsed()

Returns elapsed time since application start in secondes.

## util.Continuous

When a value is regularly updated by an external source (midi sync, osc
messages, etc) the value 'jumps' every time. This transforms a 'jumping', linear
value change to a continuous value.


Usage example:

```js
  const util = require('lucy-util')

  console.log(util.elapsed())
```

## Installation

```shell
  npm install git+ssh://git@bitbucket.org/lucidogen/lucy-util.git --save
```

## Tests

```shell
   npm test
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Especialy, do not use semicolons for statements where not to required, use comma
at the beginning of lines for lists and dictionaries.

Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.1.0 Initial release
