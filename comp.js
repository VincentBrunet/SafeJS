
var parser = require("./sources/parser");
var compiler = require("./sources/compiler");
var exporter = require("./sources/exporter");

var s = require("./sources/session.js");
var utils = require("./sources/utils.js");

// The whole pipeline
function translator(filenameIn, filenameOut) {
  // Pipeline Session
  var session = new s.Session(filenameIn, filenameOut);
  // Log
  console.log(" ## ".blue + (filenameIn + " -> " + filenameOut).green);
  //
  // Parser, .tjs to AST.tjs
  //
  parser.parse(session, function (success, error, reason) {
    // On parsing failure
    if (!success) {
      return utils.errorDisplay(
        error,
        "Parsing-" + reason,
        filenameIn,
        session.getInputLines()
      );
    }
    //
    // Compiler, AST.tjs to AST.js
    //
    compiler.compile(session, function (success, error, reason) {
      if (!success) {
        return utils.errorDisplay(
          error,
          "Compiling-" + reason,
          filenameIn,
          session.getInputLines()
        );
      }
      //
      // Exporter AST.js to .js
      //
      exporter.export(session, function (success, error, reason) {
        if (!success) {
          return utils.errorDisplay(
            error,
            "Exporting-" + reason,
            filenameIn,
            session.getInputLines()
          );
        }
        // We are done!
        session.profilingRecap();
        return;
      });
    });
  });
}

var from = process.argv[2];
var to = from + ".js";
translator(from, to);

