function(___n) {
  var test;
  _tjs._async._block([function(___n) {
    test = function() {
      resolve 42;
    };

    function debug(hop, test) {};
    ___n();
  }, function(___n) {
    _tjs._async._while([1, function(___n) {
      _tjs._async._op('@', [0, test], null, ___n);
    }], function(___n) {
      var value, hello;
      _tjs._async._block([function(___n) {
        value = 42;
        hello = "hello";
        ___n();
      }, function(___n) {
        _tjs._async._op('CALL', [0, debug], [1, function(___n) {
          _tjs._async._tuple([
            [0, value],
            [1, function(___n) {
              _tjs._async._op('@', [0, test], null, ___n);
            }],
            [0, hello]
          ], ___n);
        }], ___n);
      }, function(___n) {
        break;
        ___n();
      }], ___n);
    }, ___n)
  }, function(___n) {
    _tjs._async._while([0, 42], function(___n) {
      _tjs._async._block([function(___n) {
        _tjs._async._op('CALL', [0, _tjs._sync._op('.', console, log)], [1, function(___n) {
          _tjs._async._tuple([
            [1, function(___n) {
              _tjs._async._op('+', [0, "::"], [1, function(___n) {
                _tjs._async._op('@', [0, test], null, ___n);
              }], ___n);
            }],
            [0, "::"]
          ], ___n);
        }], ___n);
      }, function(___n) {
        _tjs._sync._op('CALL', _tjs._sync._op('.', console, log), ["Damn", "::"]);
        ___n();
      }], ___n);
    }, ___n)
  }], ___n);
}
