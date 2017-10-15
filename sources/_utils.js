var colors = require('colors');
var _ = require("lodash");
var fs = require("fs");
var path = require('path');
var lodash = require('lodash');

var $utils = {};

$utils._ = lodash;

$utils.colors = colors;

$utils.context = {};
$utils.context.clone = function (context) {
  var _context = $utils._.clone(context);
  _context.identifiers = $utils._.clone(context.identifiers);
  return _context;
};

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

$utils.fileWrite = function (file, content, next) {
  fs.writeFile(file, content, 'utf8', function (error) {
    if (error) {
      return next(false, error, file);
    }
    return next(true);
  });
};

$utils.lpad = function(num, size, prefixer) {
  var s = num + "";
  while (s.length < size) {
    s = prefixer + s;
  }
  return s;
};

$utils.errorDisplay = function (error, reason, filename, lines) {
  console.log("");
  console.log("-------------------------------------".red);
  console.log("Error:".red, error.message.yellow);
  if (reason) {
    console.log("Reason:".red, reason.yellow);
  }
  if (filename) {
    console.log("File:".red, filename.blue);
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
      if (i == location.end.line && j > location.end.column) {
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

$utils.astDisplay = function (elem, type, depths) {
  function hasChildsDeep(testedElem, depth) {
    if (testedElem == undefined) {
      return 0;
    }
    var curDepth = depth;
    if (depth == undefined) {
      curDepth = 0;
    }
    if (_.isArray(testedElem)) {
      _.each(testedElem, function (value, key) {
        curDepth = Math.max(curDepth, hasChildsDeep(value, depth));
      });
    }
    else {
      _.each(testedElem.ast_childs, function (value, key) {
        curDepth = Math.max(curDepth, hasChildsDeep(value, depth));
      });
    }
    return curDepth + 1;
  }
  function prelinePrint(prelineDepth, noCur) {
    var line = "";
    _.each(prelineDepth, function (depth, idx) {
      if (idx == depths.length - 1 && !noCur) {
        line += " \\-";
      } else {
        if (depth > 0) {
          line += " | ";
        } else {
            line += "   ";
        }
      }
    });
    return line;
  }
  if (!elem) {
    return;
  }
  if (type === undefined) {
    type = "Root";
  }
  if (depths === undefined) {
    depths = [];
  }
  var line = "";
  line += prelinePrint(depths);
  var hasPrintedEmpty = false;
  if (!isNaN(parseInt(type))) {
    line += " + ".yellow + ("[" + type + "] ").magenta;
  } else {
    line += " + ".yellow + ("[" + type + "] ").red;
  }
  if (elem.ast_type) {
    line += elem.ast_type.green;
  } else {
    line += "no-type";
  }
  if (elem.ast_title) {
    line += " " + elem.ast_title.blue;
  }
  console.log(line);
  var childDeep = hasChildsDeep(elem) > 2;
  //console.log("ChildDeep", childDeep);
  if (_.isArray(elem)) {
    var nb = 0;
    _.each(elem, function (value, key) {
      if (value !== undefined) {
        nb += 1;
      }
    });
    var cnb = 0;
    _.each(elem, function (value, key) {
      if (value !== undefined) {
        cnb += 1;
        var childDepths = depths.concat(nb - cnb);
        if (childDeep) {
          if (cnb == 1 && nb > 1) {
            console.log(prelinePrint(childDepths, true));
          }
        }
        var childPrintedEndline = $utils.astDisplay(value, key, childDepths);
        if (childDeep) {
          if (!childPrintedEndline) {
            console.log(prelinePrint(childDepths, true));
          }
          hasPrintedEmpty = true;
        }
      }
    });
  } else {
    var nb = 0;
    _.each(elem.ast_childs, function (value, key) {
      if (value !== undefined) {
        nb += 1;
      }
    });
    var cnb = 0;
    _.each(elem.ast_childs, function (value, key) {
      if (value !== undefined) {
        cnb += 1;
        var childDepths = depths.concat(nb - cnb);
        if (childDeep) {
          if (cnb == 1 && nb > 1) {
            console.log(prelinePrint(childDepths, true));
          }
        }
        var childPrintedEndline = $utils.astDisplay(value, key, childDepths);
        if (childDeep) {
          if (!childPrintedEndline) {
            console.log(prelinePrint(childDepths, true));
          }
          hasPrintedEmpty = true;
        }
      }
    });
  }
  return hasPrintedEmpty;
};

module.exports = $utils;
