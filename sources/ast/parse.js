var utils = require("../utils");
var peg = require("pegjs");

module.exports = function ast_parse(session, next) {
  var grammars = [
    "grammar/top-level/Block.gf",
    "grammar/top-level/Statement.gf",
    "grammar/top-level/Expression.gf",
    "grammar/nodes/Function.gf",
    "grammar/nodes/Litteral.gf",
    "grammar/nodes/Operation.gf",
    "grammar/nodes/Class.gf",
    "grammar/nodes/Variable.gf",
    "grammar/nodes/Condition.gf",
    "grammar/nodes/Loop.gf",
    "grammar/nodes/TryCatch.gf",
    "grammar/basics/Type.gf",
    "grammar/basics/Array.gf",
    "grammar/basics/Dict.gf",
    "grammar/basics/Tuple.gf",
    "grammar/atomics/Boolean.gf",
    "grammar/atomics/Number.gf",
    "grammar/atomics/String.gf",
    "grammar/atomics/Operator.gf",
    "grammar/atomics/Identifier.gf",
    "grammar/atomics/Whitespace.gf",
    "grammar/atomics/Comment.gf",
  ];
  session.profilingStart("parser-grammar");
  utils.fileContents(grammars, function(success, contents, error, reason) {
    session.profilingEnd("parser-grammar");
    if (!success) {
      return next(false, error, "ReadGrammars");
    }
    session.setGrammarLines(contents.split(/\r?\n/));
    try {
      session.profilingStart("parser-build");
      var toBuild = contents;
      var parser = peg.buildParser(toBuild, {
        output: "parser",
        optimize: "speed",
        cache: true,
      });
      session.profilingEnd("parser-build");
    }
    catch (error) {
      return next(false, error, "GrammarBuild");
    }
    session.profilingStart("parser-input");
    utils.fileContents([session.getInputFilename()], function(success, contents, error) {
      session.profilingEnd("parser-input");
      if (!success) {
        return next(false, error, "ReadSource");
      }
      session.setInputLines(contents.split(/\r?\n/));
      try {
        session.profilingStart("parser-parse");
        var toParse = contents;
        var parsed = parser.parse(toParse, {
          startRule: "Block",
          cache: true,
        });
        session.profilingEnd("parser-parse");
        session.setParsedAst(parsed);
        return next(true);
      }
      catch (error) {
        return next(false, error, "ParserTokens");
      }
    });
  });
};