var ttt, ttt2;

function tt(ret) {
  _tjs._sync._op('CALL', _tjs._sync._op('.', console, log), [" - Called", ret]);
  return ret;
};
_tjs._sync._op('CALL', _tjs._sync._op('.', console, log), ["Or prop"]);
if (_tjs._sync._op('||', _tjs._sync._op('CALL', tt, [false]), _tjs._sync._op('CALL', tt, [true]))) {
  _tjs._sync._op('CALL', _tjs._sync._op('.', console, log), ["Or prop, yes"]);
} else {
  _tjs._sync._op('CALL', _tjs._sync._op('.', console, log), ["Or prop, no"]);
};
_tjs._sync._op('CALL', _tjs._sync._op('.', console, log), ["Or stop"]);
if (_tjs._sync._op('||', _tjs._sync._op('CALL', tt, [true]), _tjs._sync._op('CALL', tt, [false]))) {
  _tjs._sync._op('CALL', _tjs._sync._op('.', console, log), ["Or stop, yes"]);
} else {
  _tjs._sync._op('CALL', _tjs._sync._op('.', console, log), ["Or stop, no"]);
};
_tjs._sync._op('CALL', _tjs._sync._op('.', console, log), ["And prop"]);
if (_tjs._sync._op('&&', _tjs._sync._op('CALL', tt, [true]), _tjs._sync._op('CALL', tt, [true]))) {
  _tjs._sync._op('CALL', _tjs._sync._op('.', console, log), ["And prop, yes"]);
} else {
  _tjs._sync._op('CALL', _tjs._sync._op('.', console, log), ["And prop, no"]);
};
_tjs._sync._op('CALL', _tjs._sync._op('.', console, log), ["And stop"]);
if (_tjs._sync._op('&&', _tjs._sync._op('CALL', tt, [false]), _tjs._sync._op('CALL', tt, [true]))) {
  _tjs._sync._op('CALL', _tjs._sync._op('.', console, log), ["And stop, yes"]);
} else {
  _tjs._sync._op('CALL', _tjs._sync._op('.', console, log), ["And stop, no"]);
};
_tjs._sync._op('CALL', _tjs._sync._op('.', console, log), ["OR stop, ex"]);
ttt = _tjs._sync._op('||', _tjs._sync._op('CALL', tt, [false]), _tjs._sync._op('CALL', tt, [true]));
ttt2 = _tjs._sync._op('||', _tjs._sync._op('CALL', tt, [true]), _tjs._sync._op('CALL', tt, [false]));
