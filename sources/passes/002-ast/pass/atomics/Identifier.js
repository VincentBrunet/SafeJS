// Utils
var utils = require("../../../../utils");
var ast = require("../../../../ast");

// Identifier ast structure
module.exports = function Identifier(jsonIdentifier) {
  // Current pass
  var pass = require("../../pass");
  // Check if it indeed a Identifier
  pass.check.type(jsonIdentifier, "Identifier");
  // Make AST Identifier node
  var astIdentifier = new ast.Identifier();
  // Check value
  pass.check.data(jsonIdentifier, "Value");
  // Read value
  var jsonValue = pass.read.data(jsonIdentifier, "Value");
  // Save value
  astIdentifier.value = jsonValue;
  // Save original json
  astIdentifier.json = jsonIdentifier;
  // Done
  return astIdentifier;
};
