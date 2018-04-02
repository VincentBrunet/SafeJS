function testDeasync(hop) {
  var prep;
  prep = undefined;
  while (1) {
    if (42) {
      if (false) {
        return _tjs._sync._op('+', _tjs._sync._op('+', prep, 42), 88);
      } else {
        return _tjs._sync._op('-X', 1);
      };
    } else {
      return _tjs._sync._op('-X', 2);
    };
  };
};

function testDeasync2(hop) {
  function(___n) {
    var prep;
    _tjs._async._block([function(___n) {
      prep = undefined;
      ___n();
    }, function(___n) {
      _tjs._async._while(function(___n) {
        ___n(1);
      }, function(___n) {
        _tjs._async._block([function(___n) {
          _tjs._condition([
            [function(___n) {
              ___n(42);
            }, function(___n) {
              _tjs._async._block([function(___n) {
                _tjs._condition([
                  [function(___n) {
                    ___n(false);
                  }, function(___n) {
                    _tjs._async._block([
                      return function(___n) {
                        _tjs._async._op('+', function(___n) {
                          _tjs._async._op('+', function(___n) {
                            _tjs._async._op('@', function(___n) {
                              ___n(prep);
                            }, null, ___n);
                          }, function(___n) {
                            ___n(42);
                          }, ___n);
                        }, function(___n) {
                          ___n(88);
                        }, ___n);
                      }
                    ], ___n);
                  }],
                  [null, function(___n) {
                    return _tjs._sync._op('-X', 1);
                    ___n();
                  }]
                ], ___n);
              }], ___n);
            }],
            [null, function(___n) {
              return _tjs._sync._op('-X', 2);
              ___n();
            }]
          ], ___n);
        }], ___n);
      }, ___n)
    }], ___n);
  }
};
