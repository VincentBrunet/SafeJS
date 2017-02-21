
var _ = {};
_.race = function (jobs, next) {
  var _won = false;
  _.each(jobs, function (job) {
    return job(function (a, b, c, d, e, f, g) {
      if (_won) {
        return
      }
      _won = true;
      return next(a, b, c, d, e, f, g);
    });
  });
};

_.parallel = function (jobs, done) {
  var _todo = 0;
  _.each(jobs, function (job) {
    _todo += 1;
  });
  if (_todo <= 0) {
    if (done) {
      done();
    }
    return;
  }
  _.each(jobs, function (job) {
    job(function () {
      _todo -= 1;
      if (_todo <= 0) {
        if (done) {
          done();
        }
      }
    });
  });
};

_.eachParallel = function (iterable, callback, done) {
  var _todo = 0;
  _.each(iterable, function (value, key) {
    _todo += 1;
  });
  if (_todo <= 0) {
    if (done) {
      done();
    }
    return;
  }
  _.each(iterable, function (value, key) {
    callback(function () {
      _todo -= 1;
      if (_todo <= 0) {
        if (done) {
          done();
        }
      }
    }, value, key, iterable);
  });
};

_.seq = function (jobs, done) {
  function doRecurse(idx, passed, depth) {
    if (idx >= jobs.length) {
      if (done) {
        done();
      }
      return;
    }
    var next = function (value) {
      if (depth > 1000) {
        setTimeout(function () {
          doRecurse(idx + 1, value, 0);
        }, 0);
      }
      else {
        doRecurse(idx + 1, value, depth + 1);
      }
    }
    jobs[idx](next, passed);
  }
  doRecurse(0, undefined, 0);
};

_.eachSeq = function (iterable, callback, done) {
  var params = [];
  _.each(iterable, function (value, key) {
    params.push([value, key]);
  });
  function doRecurse(idx, depth) {
    if (idx >= params.length) {
      if (done) {
        done();
      }
      return;
    }
    var param = params[idx];
    var next = function () {
      if (depth > 1000) {
        setTimeout(function () {
          doRecurse(idx + 1, 0);
        }, 0);
      }
      else {
        doRecurse(idx + 1, depth + 1);
      }
    };
    callback(next, param[0], param[1], iterable);
  }
  doRecurse(0, 0);
};

var _tjs = {
  _async: {},
  _sync: {},
};

_tjs._async._block = function (statements, next) {
  _.seq(statements, next);
};
_tjs._async._op = function (op, r1, r2, next) {

};