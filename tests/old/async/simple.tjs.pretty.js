var module = function(_$n) {
  var ttt;
  _$A._block([function(_$n) {
    ttt = undefined;

    function hello() {
      _$S._op('CALL', _$S._op('.', console, log), ["Say Hello"]);
    };
    _$n();
  }, function(_$n) {
    _$A._try(function(_$n) {
      _$A._block([function(_$n) {
        _$S._op('CALL', _$S._op('.', console, log), ["Pre"]);
        _$n();
      }, function(_$n) {
        _$A._op('CALL', [0, _$S._op('.', console, log)], [1, function(_$n) {
          _$A._tuple([
            [0, "Cur"],
            [1, function(_$n) {
              _$A._op('@', [0, ttt], null, _$n);
            }]
          ], _$n);
        }], _$n);
      }, function(_$n) {
        _$S._op('CALL', _$S._op('.', console, log), ["Post"]);
        _$n();
      }], _$n);
    }, function(_$n) {
      _$S._op('CALL', _$S._op('.', console, log), ["Finally"]);
      _$n();
    }, [function(e) {
      return function(_$n) {
        _$S._op('CALL', _$S._op('.', console, log), ["ErrorType", e]);
        _$n();
      };
    }, function(e) {
      return function(_$n) {
        _$S._op('CALL', _$S._op('.', console, log), ["Error", e]);
        _$n();
      };
    }], _$n);
  }], _$n);
};
