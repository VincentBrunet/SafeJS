// Basic utils
var utils = require("../../utils");

// PEG lib used for parsing
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
      parsed = peg_generated.parse(content, {
        startRule: "Block",
        cache: true,
        tracer: {
          trace: function(event) {
            if (event.type == "rule.enter") {
              trace_d += 1;
              console.log(trace_pp(), "EN".grey, event.rule.grey);
            }
            if (event.type == "rule.fail") {
              console.log(trace_pp(), "FA".red, event.rule.yellow,
                // event.location.start.line + ":" + event.location.start.column,
                event.location.end.line + ":" + event.location.end.column
              );
              trace_d -= 1;
            }
            if (event.type == "rule.match") {
              if (event.result) {
                console.log(trace_pp(), "OK".green, event.rule.green, event.result.ast_type.yellow,
                  event.location.start.line + ":" + event.location.start.column,
                  event.location.end.line + ":" + event.location.end.column
                );
              }
              else {
                console.log(trace_pp(), "OK".green, event.rule.green,
                  event.location.start.line + ":" + event.location.start.column,
                  event.location.end.line + ":" + event.location.end.column
                );
              }
              trace_d -= 1;
            }
          },
        },
        util: {
          makeAST: function (location, options) {
            return function (arg) {
              arg.ast_pos = location();
              if (arg.ast_childs) {
                utils._.each(arg.ast_childs, function (ast_child) {
                  if (ast_child) {
                    ast_child.ast_parent = arg;
                  }
                });
              }
              return arg;
            }
          },
        },
      });
    }
    // Parse error
    catch (error) {
      error.filename = filename;
      error.content = content;
      return next(false, undefined, error, "ParsingException");
    }
    // On parsing success
    var rawParsed = parsed;
    return next(true, rawParsed);
  });
}
