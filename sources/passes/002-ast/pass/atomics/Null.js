// Utils
var utils = require("../../../../utils");
var ast = require("../../../../ast");

// Null ast structure
module.exports = function Null(jsonNull) {
  // Current pass
  var pass = require("../../pass");
  // Check if it indeed a Null
  pass.check.type(jsonNull, "Null");
  // Make AST Null node
  var astNull = new ast.Null();
  // Save original json
  astNull.json = jsonNull;
  // Done
  return astNull;
};
