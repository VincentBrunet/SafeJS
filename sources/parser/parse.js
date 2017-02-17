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
      var trace_d = 0;
      function trace_pp() {
        var s = "";
        utils._.times(trace_d, function () {
          s += " ";
        });
        return s;
      }
      session.profilingStart("parser-parse");
      var parsed = peg_utils.parse(generated, contents, {
        startRule: "Block",
        cache: true,
        //tracer: backtracer,
        tracer: {
            // var maxOff = undefined;
            // var maxEvent = undefined;
          trace: function(event) {
            /*
            if (event.type == "rule.enter") {
              trace_d += 1;
              console.log(trace_pp(), "ST".grey, event.rule.grey);
            }
            if (event.type == "rule.fail") {
              console.log(trace_pp(), "FA".yellow, event.rule.yellow,
                // event.location.start.line + ":" + event.location.start.column,
                event.location.end.line + ":" + event.location.end.column
              );
              trace_d -= 1;
            }
            if (event.type == "rule.match") {
              console.log(trace_pp(), "OK".green, event.rule.green, event.result.ast_type.yellow,
                event.location.start.line + ":" + event.location.start.column,
                event.location.end.line + ":" + event.location.end.column
              );
              trace_d -= 1;
            }
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
