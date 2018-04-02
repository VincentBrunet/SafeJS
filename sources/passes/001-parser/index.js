// Basic utils
var utils = require("../../utils");

// PEG lib used for parsing
var peg = require("pegjs");
var peg_utils = require('pegjs-util');
var peg_tracer = require('pegjs-backtrace');
var peg_generated = require("./generated");

/**
 * First pass, read file from disk and parse it using the grammar
 */
module.exports = function (session, filename, next) {
  // Read file content
  utils.files.read(filename, function (success, content, error) {
    // On failure
    if (!success) {
      error.filename = filename;
      return next(false, undefined, error, "ReadError");
    }
    // Try to parse
    var parsed = undefined;
    try {
      // Parsing backtracer utils
      var trace_d = 0;
      function trace_pp() {
        var s = "";
        utils._.times(trace_d, function () {
          s += " ";
        });
        return s;
      }
      // Actually do the parsing
      parsed = peg_utils.parse(peg_generated, content, {
        startRule: "Block",
        cache: true,
        tracer: {
          trace: function(event) {
            return;
            if (event.type == "rule.enter") {
              trace_d += 1;
              console.log(trace_pp(), "EN".grey, event.rule.grey);
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
          },
        },
        makeAST: function (line, column, offset, args) {
          var arg = args[0];
          arg.ast_pos = {
            line: line,
            column: column,
            offset: offset,
          };
          if (arg.ast_childs) {
            utils._.each(arg.ast_childs, function (ast_child) {
              if (ast_child) {
                ast_child.ast_parent = arg;
              }
            });
          }
          return arg;
        },
      });
    }
    // Parse error
    catch (error) {
      error.filename = filename;
      error.content = content;
      return next(false, undefined, error, "ParsingException");
    }
    // On parsing error
    if (parsed.error) {
      parsed.error.filename = filename;
      parsed.error.content = content;
      return next(false, undefined, parsed.error, "ParsingError");
    }
    // On parsing success
    var rawParsed = parsed.ast;
    return next(true, rawParsed);
  });
}
