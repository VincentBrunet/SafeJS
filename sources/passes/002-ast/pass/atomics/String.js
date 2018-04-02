// Utils
var utils = require("../../../../utils");
var ast = require("../../../../ast");

// String ast structure
module.exports = function String(jsonString) {
  // Current pass
  var pass = require("../../pass");
  // Check if it indeed a String
  pass.check.type(jsonString, "String");
  // Make AST String node
  var astString = new ast.String();
  // Check value
  pass.check.data(jsonString, "Value");
  // Read value
  var jsonValue = pass.read.data(jsonString, "Value");
  // Save value
  astString.value = jsonValue;
  // Save original json
  astString.json = jsonString;
  // Done
  return astString;
};
