// Utils
var utils = require("../../../../utils");
var ast = require("../../../../ast");

// Type ast structure
module.exports = function Type(jsonType) {
  // Current pass
  var pass = require("../../pass");
  // Check if it indeed a Type
  pass.check.type(jsonType, "Type");
  // Make AST Type node
  var astType = new ast.Type();
  /*
  // Check value
  pass.check.data(jsonType, "Value");
  // Read value
  var jsonValue = pass.read.data(jsonType, "Value");
  // Save value
  astType.value = jsonValue;
  */
  // Save original json
  astType.json = jsonType;
  // Done
  return astType;
};
