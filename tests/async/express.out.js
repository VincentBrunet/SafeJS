function(next) {
  _tjs._async._block([
    function(next) { /* undefined */
      var prom = undefined;
      next()
    },
    function(next) { /* undefined */
      var prom2 = undefined;
      next()
    },
    function(next) { /* undefined */
      var prom3 = undefined;
      next()
    }, /* undefined */
    function(next) {
      _tjs._async._assign(function(next) {
        _tjs._async._op(
          '@',
          function(next) {
            next(prom);
          },
          undefined, next);
      }, function(val) { test = val }, next)
    }, /* undefined */
    function(next) {
      _tjs._async._assign(function(next) {
        _tjs._async._op(
          '+',
          function(next) {
            _tjs._async._op(
              '+',
              function(next) {
                _tjs._async._op(
                  '@',
                  function(next) {
                    next(prom);
                  },
                  undefined, next);
              },
              function(next) {
                _tjs._async._op(
                  '@',
                  function(next) {
                    next(prom3);
                  },
                  undefined, next);
              }, next);
          },
          function(next) {
            next(test);
          }

          , next);
      }, function(val) { test2 = val }, next)
    }, /* undefined */
    function(next) {
      _tjs._async._assign(function(next) {
        _tjs._async._op(
          '||',
          function(next) {
            _tjs._async._op(
              '@',
              function(next) {
                next(prom);
              },
              undefined, next);
          },
          function(next) {
            _tjs._async._op(
              '@',
              function(next) {
                next(prom2);
              },
              undefined, next);
          }, next);
      }, function(val) { test3 = val }, next)
    }, /* undefined */
    function(next) {
      _tjs._async._assign(function(next) {
        _tjs._async._op(
          '&&',
          function(next) {
            _tjs._async._op(
              '&&',
              function(next) {
                _tjs._async._op(
                  '@',
                  function(next) {
                    next(prom);
                  },
                  undefined, next);
              },
              function(next) {
                _tjs._async._op(
                  '@',
                  function(next) {
                    next(prom2);
                  },
                  undefined, next);
              }, next);
          },
          function(next) {
            _tjs._async._op(
              '@',
              function(next) {
                next(prom3);
              },
              undefined, next);
          }, next);
      }, function(val) { test4 = val }, next)
    }, /* undefined */
    function(next) {
      _tjs._async._assign(function(next) {
        _tjs._async._op(
          'CALL',
          function(next) {
            next(_tjs._sync._op('.', console, log));
          },
          function(next) {
            _tjs._async._tuple([
              function(next) {
                _tjs._async._op(
                  '@',
                  function(next) {
                    next(prom);
                  },
                  undefined, next);
              },
              function(next) {
                _tjs._async._op(
                  '+',
                  function(next) {
                    _tjs._async._op(
                      '@',
                      function(next) {
                        next(prom);
                      },
                      undefined, next);
                  },
                  function(next) {
                    next(42);
                  }

                  , next);
              }
            ], next);
          }

          , next);
      }, function(val) { test5 = val }, next)
    }
  ], next);
}
