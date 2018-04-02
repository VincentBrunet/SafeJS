
function getAsync(url, next) {
  return setTimeout(function (response) {
    return next(url);
  }, 1000);
}

var idx = 0;

function getSync(url, __next_42) {
  var preval;
  preval = _tjs._async(function (resolve, reject) {
    getAsync(url, function (content) {
      idx += 1;
      if (idx % 7 == 5) {
        return reject(new Error());
      }
      else {
        return resolve(content);
      }
    });
  });
  console.log("Post", url);
  _tjs._try(
    function (next) {

    },
    [
      CustomError, function (next) {
      },
      undefined, function (next) {
      },
    ],
    function (next) {

    },
  );
};



_tjs._if(
  [
    function _xpr(next) {

    },
    function _act(next) {

    },
  ],
  [
    function _xpr(next) {

    },
    function _act(next) {

    },
  ],
  function _after() {

    _tjs._expr(function (expr) {
      console.log("Last", expr);
    });

  },
);
