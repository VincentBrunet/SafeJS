var _ = require("../_");
var fs = require("fs");

var files = {}

files.read = function(filename, next) {
  fs.readFile(filename, 'utf8', function(error, content) {
    if (error) {
      return next(false, undefined, error, "ReadError");
    }
    return next(true, content);
  });
};

files.readSeq = function (filenames, next) {
  var finalSuccess = true;
  var finalError;
  var contents = "";
  _.eachSeq(filenames, function (iterate, filename) {
    files.read(filename, function (success, content, error) {
      if (success) {
        contents += content;
      } else {
        if (finalSuccess) {
          finalSuccess = false;
          finalError = error;
        }
      }
      iterate();
    });
  }, function () {
    return next(finalSuccess, contents, finalError, "SeqRead");
  });
};

files.write = function (filename, content, next) {
  fs.writeFile(filename, content, 'utf8', function (error) {
    if (error) {
      return next(false, undefined, error, "WriteError");
    }
    return next(true, {});
  });
};

module.exports = files;
