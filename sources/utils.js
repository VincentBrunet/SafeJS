var colors = require('colors');
var _ = require("lodash");
var fs = require("fs");
var path = require('path');

var $utils = {};

$utils.fileContents = function(files, next) {
  var _contents = "";
  var _read = function(idx) {
    if (idx >= files.length) {
      return next(true, _contents);
    }
    var file = files[idx];
    fs.readFile(file, 'utf8', function(error, content) {
      if (error) {
        return next(false, undefined, error, file);
      }
      _contents += content;
      return _read(idx + 1);
    });
  }
  _read(0);
};

$utils.lpad = function(num, size, prefixer) {
  var s = num + "";
  while (s.length < size) {
    s = prefixer + s;
  }
  return s;
};

$utils.errorDisplay = function (error, reason, session) {
  console.log("");
  console.log("-------------------------------------".red);
  console.log("Error:".red, error.message.yellow);
  if (reason) {
    console.log("Reason:".red, reason.yellow);
  }
  if (session) {
    console.log("File:".red, session.getInputFilename().blue);
  }
  if (error.location) {
    console.log(
      "At:".red,
      ("line " + error.location.start.line) + ",",
      ("column " + error.location.start.column)
    );
  }
  console.log("-------------------------------------".red);
  if (!error.location) {
    console.log(error);
    return;
  }
  var border = 3;
  var lines = session.getInputLines();
  if (reason == "GrammarBuild") {
    lines = session.getGrammarLines();
  }
  var lineLog = Math.floor(Math.log10(lines.length));
  var location = {
    start: {
      line: error.location.start.line - 1,
      column: error.location.start.column - 1,
    },
    end: {
      line: error.location.end.line - 1,
      column: error.location.end.column - 1,
    },
  };
  var startLine = Math.max(location.start.line - border, 0);
  var endLine = Math.min(location.end.line + border, lines.length - 1);
  for (var i = startLine; i <= endLine; i++) {
    var line = lines[i];
    var printed = "";
    var isClose = true;
    if (i < location.start.line || i > location.end.line) {
      isClose = false;
    }
    for (var j = 0; j < line.length; j++) {
      var isError = isClose;
      if (i == location.start.line && j < location.start.column) {
        isError = false;
      }
      if (i == location.end.line && j >= location.end.column) {
        isError = false;
      }
      if (isClose) {
        if (isError) {
          printed += line[j].bgRed.black;
        } else {
          printed += line[j];
        }
      } else {
        printed += line[j];
      }
    }
    var lNb = $utils.lpad(i + 1, lineLog + 1, "0");
    if (isClose) {
      console.log("#".yellow + lNb.yellow + " - ".red + printed);
    } else {
      console.log("#".green + lNb.green + " - ".red + printed);
    }
  }
  console.log("-------------------------------------".red);
  console.log(error);
}

$utils.astDisplay = function (elem, type, depth) {
  if (!elem) {
    return;
  }
  if (type === undefined) {
    type = "Root";
  }
  if (depth === undefined) {
    depth = 0;
  }
  var line = "";
  _.times(depth, function() {
    line += " | ";
  });
  line += " + ".yellow + ("[" + type + "] ").red;
  if (elem.ast_type) {
    line += elem.ast_type.green;
  } else {
    line += "no-type";
  }
  if (elem.ast_title) {
    line += " " + elem.ast_title.blue;
  }
  console.log(line);
  _.each(elem.ast_childs, function(value, key) {
    $utils.astDisplay(value, key, depth + 1);
  });
};

module.exports = $utils;
