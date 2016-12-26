var peg = require("pegjs");
var peg_utils = require('pegjs-util');
var utils = require("../utils");
var generated = require("./generated");

var Ast = require("../ast");

module.exports = function (session, next) {

  session.profilingStart("parser");

  session.profilingStart("parser-load");

  // Load translated file content
  utils.fileContents([session.getInputFilename()], function(success, contents, error) {

    // Profiler
    session.profilingEnd("parser-load");

    // On success
    if (!success) {
      return next(false, error, "ReadSource");
    }

    // Save loaded content
    session.setInputLines(contents.split(/\r?\n/));

    // Try to parse
    try {
      session.profilingStart("parser-parse");
      var parsed = peg_utils.parse(generated, contents, {
        startRule: "Block",
        cache: true,
        //tracer: backtracer,
        tracer: {
            // var maxOff = undefined;
            // var maxEvent = undefined;
          trace: function(event) {
            // console.log(event);
          /*
            if (event.type != "rule.fail") {
              return;
            }
            if (maxOff == undefined || event.location.start.offset > maxOff) {
              maxOff = event.location.start.offset;
              maxEvent = event;
            }
            // console.log("Trace", a, b, c);
          */
          },
        },
        makeAST: function (line, column, offset, args) {
          var arg = args[0];
          arg.ast_pos = {
            line: line,
            column: column,
            offset: offset,
          };
          return arg;
        },
      });
      session.profilingEnd("parser-parse");

      if (parsed.error) {
        throw parsed.error;
      }

      var rawAst = parsed.ast;

      utils.astDisplay(rawAst);

      session.profilingStart("parser-hydrate");

      try {
        var objAst = new Ast.node("Block", rawAst);
        session.setParsedAst(objAst);
      } catch (error) {
        console.log("Hydrate error");
        console.log(error.stack);
      }

      session.profilingEnd("parser-hydrate");

      session.profilingEnd("parser");

      return next(true);
    }
    catch (error) {

      console.log("Parse error", error);

      return next(false, error, "Tokens");

    }
  });
};
