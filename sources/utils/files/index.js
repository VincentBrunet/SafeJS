var _ = require("../_");
var trace = require("../trace");
var fs = require("fs");

var files = {}

files.read = function(filename, next) {
  fs.readFile(filename, 'utf8', function(error, content) {
    if (error) {
      return next(false, undefined, trace.make(error));
    }
    return next(true, content);
  });
};

files.readSeq = function (filenames, next) {
  var finalSuccess = true;
  var finalTrace;
  var contents = "";
  _.eachSeq(filenames, function (iterate, filename) {
    files.read(filename, function (success, content, trace) {
      if (success) {
        contents += content;
      } else {
        if (finalSuccess) {
          finalSuccess = false;
          finalTrace = trace;
        }
      }
      iterate();
    });
  }, function () {
    return next(finalSuccess, contents, trace.next(finalTrace));
  });
};

files.write = function (filename, content, next) {
  fs.writeFile(filename, content, 'utf8', function (error) {
    if (error) {
      return next(false, undefined, trace.make(error));
    }
    return next(true, {});
  });
};

module.exports = files;
