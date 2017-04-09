// Basic utils
var utils = require("../../utils");

// Basic AST pass code
var Ast = require("./pass");

/**
 * Take a raw parsed file and turn it into a basic AST
 */
module.exports = function(session, rawParsed, next) {
  try {
    var objAst = new Ast.node("Block", rawParsed);
    return next(true, objAst);
  } catch (error) {
    return next(false, undefined, utils.trace.make(error));
  }
};

