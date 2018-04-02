// Utils
var utils = require("../../../../utils");
var ast = require("../../../../ast");

// Undefined ast structure
module.exports = function Undefined(jsonUndefined) {
  // Current pass
  var pass = require("../../pass");
  // Check if it indeed a Undefined
  pass.check.type(jsonUndefined, "Undefined");
  // Make AST Undefined node
  var astUndefined = new ast.Undefined();
  // Save original json
  astUndefined.json = jsonUndefined;
  // Done
  return astUndefined;
};
