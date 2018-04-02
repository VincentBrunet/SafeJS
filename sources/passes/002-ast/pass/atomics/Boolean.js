// Utils
var utils = require("../../../../utils");
var ast = require("../../../../ast");

// Boolean ast structure
module.exports = function Boolean(jsonBoolean) {
  // Current pass
  var pass = require("../../pass");
  // Check if it indeed a Boolean
  pass.check.type(jsonBoolean, "Boolean");
  // Make AST Boolean node
  var astBoolean = new ast.Boolean();
  // Check value
  pass.check.data(jsonBoolean, "Value");
  // Read value
  var jsonValue = pass.read.data(jsonBoolean, "Value");
  // Save value
  if (jsonValue == "true") {
    astBoolean.value = true;
  }
  else {
    astBoolean.value = false;
  }
  // Save original json
  astBoolean.json = jsonBoolean;
  // Done
  return astBoolean;
};
