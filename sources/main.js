var fs = require("fs");

var passParser = require("./passes/001-parser");
var passAst = require("./passes/002-ast");
var passIsAsync = require("./passes/025-isAsync");
var passExport = require("./passes/100-export");
var passPrettify = require("./passes/200-prettify");

var utils = require("./_utils");

var errors = require("./errors");

function translator(filenameIn, filenameOut, filenamePretty) {
  var session = {};
  // PARSE pass, read file and parse to raw AST
  passParser(session, filenameIn, function (success, rawAst, error, reason) {
    if (!success) {
      return errors.parsing.explain(reason, error);
    }
    utils.astDisplay(rawAst);
    // AST pass, read AST and do basic verifications
    passAst(session, rawAst, function (success, objAst, trace) {
      // ASYNC pass, check every node for async needs
      passIsAsync(session, objAst, function (success, asyncAst, trace) {
        // EXPORT pass, read ast and generate JS
        passExport(session, asyncAst, function (success, jsCode, trace) {
          //console.log("JS Code", jsCode);
          fs.writeFile(filenameOut, jsCode, function (err) {
            console.log("Done", filenameOut);
          });
          passPrettify(session, jsCode, function (success, prettyCode, trace) {
            //console.log("Pretty Code", prettyCode);
            fs.writeFile(filenamePretty, prettyCode, function (err) {
              console.log("Done", filenamePretty);
            });
          });
        });
      });
    });
  });
}

var filenameIn = process.argv[2];
var filenameOut = filenameIn + ".min.js";
var filenamePretty = filenameIn + ".pretty.js";

translator(filenameIn, filenameOut, filenamePretty);
