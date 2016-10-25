var utils = require("../utils");
var peg = require("pegjs");
var backtrace = require('pegjs-backtrace');
var generated = require("./generated");

module.exports = function (session, next) {
  session.profilingStart("parser");
  session.profilingStart("parser-input");
  utils.fileContents([session.getInputFilename()], function(success, contents, error) {
    session.profilingEnd("parser-input");
    if (!success) {
      return next(false, error, "ReadSource");
    }
    session.setInputLines(contents.split(/\r?\n/));
    var backtracer = new backtrace(contents);
    try {
      session.profilingStart("parser-parse");
      var toParse = contents;
      var parsed = generated.parse(toParse, {
        startRule: "Block",
        cache: true,
        //tracer: backtracer,
        tracer: {
            // var maxOff = undefined;
            // var maxEvent = undefined;
          trace: function(event) {
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
      });
      session.setParsedAst(parsed);
      session.profilingEnd("parser-parse");
      session.profilingEnd("parser");
      return next(true);
    }
    catch (error) {
      console.log(backtracer.getBacktraceString());
      return next(false, error, "Tokens");
    }
  });
};
