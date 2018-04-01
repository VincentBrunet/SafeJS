var peg = require("pegjs");
var utils = require("../sources/utils");
var parserPassPrefix = "sources/passes/001-parser";
var grammarPrefix = parserPassPrefix + "/grammar";
var grammars = [
  grammarPrefix + "/top-level/Globals.gf",
  grammarPrefix + "/top-level/Block.gf",
  grammarPrefix + "/top-level/Statement.gf",
  grammarPrefix + "/statements/Expression.gf",
  grammarPrefix + "/statements/Variable.gf",
  grammarPrefix + "/statements/Condition.gf",
  grammarPrefix + "/statements/Loop.gf",
  grammarPrefix + "/statements/Return.gf",
  grammarPrefix + "/statements/Resolve.gf",
  grammarPrefix + "/statements/Throw.gf",
  grammarPrefix + "/statements/TryCatch.gf",
  grammarPrefix + "/statements/Break.gf",
  grammarPrefix + "/statements/Continue.gf",
  grammarPrefix + "/statements/Enum.gf",
  grammarPrefix + "/expressions/Class.gf",
  grammarPrefix + "/expressions/Async.gf",
  grammarPrefix + "/expressions/Function.gf",
  grammarPrefix + "/expressions/Litteral.gf",
  grammarPrefix + "/expressions/Operation.gf",
  grammarPrefix + "/basics/Type.gf",
  grammarPrefix + "/basics/Array.gf",
  grammarPrefix + "/basics/Dict.gf",
  grammarPrefix + "/basics/Tuple.gf",
  grammarPrefix + "/atomics/Boolean.gf",
  grammarPrefix + "/atomics/Number.gf",
  grammarPrefix + "/atomics/String.gf",
  grammarPrefix + "/atomics/Identifier.gf",
  grammarPrefix + "/atomics/Whitespace.gf",
  grammarPrefix + "/atomics/Comment.gf",
  grammarPrefix + "/atomics/Null.gf",
  grammarPrefix + "/atomics/Undefined.gf",
];
utils.files.readSeq(grammars, function(success, contents, trace) {
  if (!success) {
    console.log("Read Trace", trace);
  }
  var lines = contents.split(/\r?\n/);
  try {
    var toBuild = contents;
    var parser = peg.generate(toBuild, {
      output: "source",
      format: "commonjs",
      optimize: "speed",
      cache: true,
      trace: true,
    });
    utils.files.write(parserPassPrefix + "/generated/index.js", parser, function(success, res, trace) {
      if (!success) {
        console.log("Write Trace", trace);
      } else {
        console.log("Parser Generated Successfully");
      }
    });
  } catch (error) {
    // utils.errorDisplay(error, "Parser-Generate", grammarPrefix, lines)
    throw error;
  }
});
