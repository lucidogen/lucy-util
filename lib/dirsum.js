/*
  # checkdir

  Compute directory checksum.
*/
'use strict'
const crypto   = require ( 'crypto' )
const path     = require ( 'path'   )
const fs       = require ( 'fs'     )

const md5 = function ( self, apath, clbk, isdir )
{ self.hash.update ( apath ) // add path to hash ( for empty directory )
  if ( isdir )
  { fs.readdir
    ( apath
    , function ( err, filenames )
      { if ( err ) return clbk ( err )
        let i = 0, len = filenames.length
        let parse = function ( err )
        { if ( err ) return clbk ( err )
          if ( i >= len ) return clbk ()
          let f = filenames [ i++ ]
          let p = path.join ( apath, f )
          if ( self.ignore ( p, f ) )
          { parse ()
          }
          else
          { fs.stat
            ( p
            , function ( err, stats )
              { if ( err ) return clbk ( err )
                if ( stats.isDirectory () )
                { md5 ( self, p, parse, true )
                }
                else
                { md5 ( self, p, parse )
                }
              }
            )
          }
        }
        parse ()
      }
    )
  }
  else
  { let stream = fs.createReadStream ( apath )

    stream.on
    ( 'data'
    , function ( data )
      { self.hash.update ( data )
      }
    )

    stream.on
    ( 'end'
    , clbk
    )
  }
}

const IGNORE_DOT_FILES = /^\./

const DEFAULT_IGNORE_FUNCTION = function ( path, filename )
{ return IGNORE_DOT_FILES.exec ( filename )
}

module.exports = function ( apath, clbk, ignore )
{ apath = path.resolve ( apath )
  ignore = ignore || DEFAULT_IGNORE_FUNCTION
  let plen = apath.length + 1

  let ignoreFunc = function ( path, filename )
  { return ignore ( path.substring ( plen ), filename )
  }
  
  let self =
  { hash: crypto.createHash ( 'md5' )
  , ignore: ignoreFunc
  }
  fs.stat
  ( apath
  , function ( err, stats )
    { if ( err ) return clbk ( err )
      md5
      ( self
      , apath
      , function ( err )
        { if ( err ) return clbk ( err )
          clbk ( null, self.hash.digest ( 'hex' ) )
        }
      , stats.isDirectory ()
      )
    }
  )
}

