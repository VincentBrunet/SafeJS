var module = function(_$n) {
  var test, ttt, idx;
  _$A._block([function(_$n) {
    test = function() { /* resolve 42*/ ;
    };

    function debug(hop, test) {};
    ttt = function debug2(a, b) {};
    _$n();
  }, function(_$n) {
    _$A._while([1, function(_$n) {
      _$A._op('@', [0, test], null, _$n);
    }], function(_$n) {
      var test, value, hello;
      _$A._block([function(_$n) {
        _$A._assign([1, function(_$n) {
          _$A._op('@', [0, tutu], null, _$n);
        }], function(_$1) {
          test = _$1;
        }, _$n);
      }, function(_$n) {
        value = 42;

        function lol() {
          return value;
        };
        hello = "hello";
        _$n();
      }, function(_$n) {
        _$A._op('CALL', [0, debug], [1, function(_$n) {
          _$A._tuple([
            [0, value],
            [1, function(_$n) {
              _$A._op('@', [0, test], null, _$n);
            }],
            [0, hello]
          ], _$n);
        }], _$n);
      }, function(_$n) { /* break */ ;
        _$n();
      }], _$n);
    }, _$n);
  }, function(_$n) {
    _$A._block([function(_$n) {
      _$A._block([function(_$n) {
        _$A._op('CALL', [0, _$S._op('.', Debug, log)], [1, function(_$n) {
          _$A._tuple([
            [0, "Hello"],
            [1, function(_$n) {
              _$A._op('@', [0, test], null, _$n);
            }]
          ], _$n);
        }], _$n);
      }], _$n);
    }], _$n);
  }, function(_$n) {
    _$A._while([0, 42], function(_$n) {
      _$A._block([function(_$n) {
        _$A._op('CALL', [0, _$S._op('.', Debug, log)], [1, function(_$n) {
          _$A._tuple([
            [1, function(_$n) {
              _$A._op('+', [0, "::"], [1, function(_$n) {
                _$A._op('@', [0, test], null, _$n);
              }], _$n);
            }],
            [0, "::"]
          ], _$n);
        }], _$n);
      }, function(_$n) {
        _$S._op('CALL', _$S._op('.', Debug, log), ["Damn", "::"]);
        _$n();
      }], _$n);
    }, _$n);
  }, function(_$n) {
    while (42) {
      _$S._op('CALL', _$S._op('.', Debug, log), ["Hop"]);
    };
    idx = 10;
    _$n();
  }, function(_$n) {
    _$A._repeat([0, 10], function(_$n) {
      _$A._block([function(_$n) {
        _$S._op('-=', idx, 1);
        _$n();
      }, function(_$n) {
        _$A._op('CALL', [0, _$S._op('.', Debug, log)], [1, function(_$n) {
          _$A._tuple([
            [0, "Hello"],
            [1, function(_$n) {
              _$A._op('@', [0, test], null, _$n);
            }],
            [0, idx]
          ], _$n);
        }], _$n);
      }], _$n);
    }, _$n);
  }, function(_$n) {
    var _$1, _$2 = 10;
    for (_$1 = 0; _$1 < _$2; _$1++) {
      _$S._op('CALL', _$S._op('.', Debug, log), ["Hop"]);
    };
    _$n();
  }], _$n);
};
