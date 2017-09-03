function(___n) {
  var test;
  _tjs._async._block([
    [0, function() {
      test = function() {
        resolve 42;
      };

      function debug(hop, test) {};
    }],
    [1, function(___n) {
      _tjs._async._while([1, function(___n) {
        _tjs._async._op('@', [0, test], null, ___n);
      }], function(___n) {
        var value, other;
        _tjs._async._block([
          [0, function() {
            value = 42;
            other = "hello";
          }],
          [1, function(___n) {
            _tjs._async._op('CALL', [0, debug], [1, function(___n) {
              _tjs._async._tuple([
                [0, value],
                [0, hello],
                [1, function(___n) {
                  _tjs._async._op('@', [0, test], null, ___n);
                }]
              ], ___n);
            }], , ___n);
          }],
          [0, function() {
            break;
          }]
        ], ___n);
      }, ___n)
    }]
  ], ___n);
}
