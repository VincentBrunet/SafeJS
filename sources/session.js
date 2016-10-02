var _ = require("lodash");

var $session = {};

$session.Session = function (filenameIn, filenameOut) {

  // Object self
  var self = this;

  // Empty session
  self._internal = {
    grammar: {
      lines: [],
    },
    input: {
      filename: filenameIn,
      lines: [],
      ast: null,
    },
    output: {
      filename: filenameOut,
      lines: [],
      ast: null,
    },
    ast: {
      parsed: null,
      structured: null,
    },
    profiles: {
      array: [],
      index: {},
    },
  };

  // Generated grammar
  self.getGrammarLines = function () {
    return self._internal.grammar.lines;
  }
  self.setGrammarLines = function (lines) {
    self._internal.grammar.lines = lines;
  }

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
