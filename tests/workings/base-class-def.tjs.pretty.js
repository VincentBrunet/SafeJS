var module = function(_$n) {
  var test2, obj1, obj2;
  class Simple {};
  class Test1 {
    var tutu;
    tutu = 42;
  };
  test2 = class /* ANONYMOUS */ {};
  obj1 = _$S._op('new', Test1, []);
  obj2 = _$S._op('new', test2, [10]);
  _$S._op('CALL', _$S._op('.', Debug, log), [_$S._op('ACCESS', obj1, 42)]);
  _$S._op('CALL', _$S._op('.', Debug, log), [_$S._op('ACCESS', obj2, 42)]);
  _$n();
};
