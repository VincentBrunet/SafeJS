function testDeasync(hop) {
  function(___n) {
    var prep, val;
    _tjs._async._block([function(___n) {
      prep = undefined;
      ___n();
    }, function(___n) {
      _tjs._async._assign(function(___n) {
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
      }, function(v) {
        val = v;
      }, ___n)
    }, function(___n) {
      if (val) {
        return val;
      } else {
        return _tjs._sync._op('-X', 1);
      };
      _tjs._sync._op('CALL', _tjs._sync._op('.', console, log), ["Hop"]);
      ___n();
    }], ___n);
  }
};
