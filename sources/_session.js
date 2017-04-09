var _ = require("lodash");

var $session = {};

$session.Session = function (filenameIn, filenameOut) {

  // Object self
  var self = this;

  // Empty session
  self._internal = {
    input: {
      filename: filenameIn,
      lines: [],
      ast: null,
    },
    compile: {
      ast: null,
    },
    output: {
      filename: filenameOut,
      lines: [],
      ast: null,
    },
    profiles: {
      array: [],
      index: {},
    },
  };

  // Basic input
  self.getInputFilename = function () {
    return self._internal.input.filename;
  };
  self.getInputLines = function () {
    return self._internal.input.lines;
  };
  self.setInputLines = function (lines) {
    self._internal.input.lines = lines;
  };

  // Parsed AST
  self.setParsedAst = function (ast) {
    self._internal.input.ast = ast;
  };
  self.getParsedAst = function () {
    return self._internal.input.ast;
  };

  // Compiled AST
  self.setCompiledAst = function (ast) {
    self._internal.compile.ast = ast;
  };
  self.getCompiledAst = function () {
    return self._internal.compile.ast;
  };

  // Profiling
  self.profilingStart = function (label) {
    self._internal.profiles.array.push(label);
    self._internal.profiles.index[label] = {
      start: new Date().getTime(),
      end: null,
    };
  };
  self.profilingEnd = function (label) {
    var profile = self._internal.profiles.index[label];
    profile.end = new Date().getTime();
  };
  self.profilingRecap = function () {
    console.log("");
    _.each(self._internal.profiles.array, function (label) {
      var profile = self._internal.profiles.index[label];
      console.log(label.green, (profile.end - profile.start) + "ms");
    });
    console.log("");
  };

};


module.exports = $session;
