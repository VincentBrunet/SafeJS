
var s = require("./sources/session.js");
var utils = require("./sources/utils.js");
var ast = {
  parse: require("./sources/ast/parse.js"),
  compile: require("./sources/ast/compile.js"),
  export: require("./sources/ast/export.js"),
};

// The whole pipeline
function translator(filenameIn, filenameOut) {
  // Pipeline Session
  var session = new s.Session(filenameIn, filenameOut);
  // Log
  console.log(" ## ".blue + (filenameIn + " -> " + filenameOut).green);
  // Parser, .tjs to AST.tjs
  session.profilingStart("parser");
  ast.parse(session, function (success, error, reason) {
    session.profilingEnd("parser");
    // On parsing failure
    if (!success) {
      return utils.errorDisplay(error, reason, session);
    }
    // Compiler, AST.tjs to AST.js
    session.profilingStart("compiler");
    ast.compile(session, function (success, error, reason) {
      session.profilingEnd("compiler");
      if (!success) {
        throw error;
      }
      // Exporter AST.js to .js
      session.profilingStart("exporter");
      ast.export(session, function (success, error, reason) {
        session.profilingEnd("exporter");
        if (!success) {
          throw error;
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

