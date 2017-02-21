_tjs._block(function (resolve, reject) {

});


_tjs._block(function(next) {

  var prom = undefined;
  var prom2 = undefined;
  var prom3 = undefined;

  _tjs._desync(function(next) {
    next(prom);
  }, function(result) {

    var test = result;

    _tjs._expr(function(next) {
      _tjs._add(function(next) {
        _tjs._add(function(next) {
          _tjs._desync(function(next) {
            next(prom);
          }, next);
        }, function(next) {
          _tjs._desync(function(next) {
            next(prom3);
          }, next);
        }, next);
      }, function(next) {
        next(test);
      }, next);
    }, function(result) {

      var test2 = result;

      _tjs._expr(function(next) {
        _tjs._or(function(next) {
          _tjs._desync(prom, next);
        }, function(next) {
          _tjs._desync(prom2, next);
        }, next);
      }, function(result) {

        var test3 = result;

        _tjs._expr(function(next) {
          _tjs._and(function(next) {
            _tjs._and(function(next) {
              _tjs._desync(prom, next);
            }, function(next) {
              _tjs._desync(prom2, next);
            }, next);
          }, function(next) {
            _tjs._desync(prom3, next);
          }, next);
        }, function(result) {

          var test4 = result;

          _tjs._call(function(next) {
            next(console.log);
          }, function(next) {
            _tjs._fparams(function(next) {
              _tjs._desync(prom, next);
            }, function(next) {
              _tjs._desync(prom, function(result) {
                next(result + 42);
              });
            });
          }, function(result) {

            var test5 = result;

            // CHECKPOINT

          });
        });

      });

    });

  });

}, function() {

  // Module loaded finish

});
