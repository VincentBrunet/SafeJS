// Basic utils
var utils = require("../../utils");

// Current pass functions
var pass = require("./pass");

/**
 * Take a raw parsed file and turn it into a basic AST
 */
module.exports = function(session, jsonAst, next) {
  try {
    var root = pass.make.Block(jsonAst);
    return next(true, root);
  }
  catch (error) {
    return next(false, undefined, error, "AstStructure");
  }
};
