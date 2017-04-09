var passParser = require("./passes/001-parser");
var passAst = require("./passes/002-ast");
var passExport = require("./passes/100-export");

function translator(filenameIn, filenameOut) {
  var session = {};
  passParser(session, filenameIn, function(success, rawAst, trace) {
    console.log("rawAst", rawAst, trace);
    passAst(session, rawAst, function(success, objAst, trace) {
      console.log("objAst", objAst, trace);
      passExport(session, objAst, function(success, jsCode, trace) {
        console.log("JS CODE FINAL", jsCode);
      });
    });
  });
}

var filenameIn = process.argv[2];
var filenameOut = filenameIn + ".js";

translator(filenameIn, filenameOut);
