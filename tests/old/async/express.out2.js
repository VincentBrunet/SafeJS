function(___n) {
  var prom, prom2, prom3, test, test2, test3, test4, test5;
  _tjs._async._block([
    function(___n) { prom = undefined;
      ___n(); },
    function(___n) { prom2 = undefined;
      ___n(); },
    function(___n) { prom3 = undefined;
      ___n(); },
    function(___n) { _tjs._async._assign(function(___n) { _tjs._async._op('@', prom, null, ___n); }, function(v) { test = v }, ___n) },
    function(___n) {
      _tjs._async._assign(function(___n) {
        _tjs._async._op('+', function(___n) {
          _tjs._async._op('+', function(___n) { _tjs._async._op('@', prom, null, ___n); }, function(___n) {
            _tjs._async._op('@', prom3, null, ___n);
          }, ___n);
        }, test, ___n);
      }, function(v) { test2 = v }, ___n)
    },
    function(___n) {
      _tjs._async._assign(function(___n) { _tjs._async._op('||', function(___n) { _tjs._async._op('@', prom, null, ___n); }, function(___n) { _tjs._async._op('@', prom2, null, ___n); }, ___n); }, function(v) { test3 = v }, ___ n)
    },
    function(___n) {
      _tjs._async._assign(function(___n) {
        _tjs._async._op('&&', function(___n) {
          _tjs._async._op('&&', function(___n) { _tjs._async._op('@', prom, null, ___n); }, function(___n) {
            _tjs._async._op('@', prom2, null, ___n);
          }, ___n);
        }, function(___n) { _tjs._async._op('@', prom3, null, ___n); }, ___n);
      }, function(v) { test4 = v }, ___n)
    },
    function(___n) {
      _tjs._async._assign(function(___n) {
        _tjs._async._op('CALL', _tjs._sync._op('.', console, log), function(___n) {
          _tjs._async._tuple([function(___n) { _tjs._async._op('@', prom, null, ___n); }, function(___n) {
            _t
            js._async._op('+', function(___n) { _tjs._async._op('@', prom, null, ___n); }, 42, ___n);
          }], ___n);
        }, ___n);
      }, function(v) { test5 = v }, ___n)
    },
    function(___n) { _tjs._sync._op('=', test, 42);
      ___n(); }
  ], ___n);
}
