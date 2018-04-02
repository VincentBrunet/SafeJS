// Utils
var utils = require("../../../../utils");
var ast = require("../../../../ast");

// Number ast structure
module.exports = function Number(jsonNumber) {
  // Current pass
  var pass = require("../../pass");
  // Check if it indeed a Number
  pass.check.type(jsonNumber, "Number");
  // Make AST Number node
  var astNumber = new ast.Number();
  // Check value
  pass.check.data(jsonNumber, "Value");
  // Read value
  var jsonValue = pass.read.data(jsonNumber, "Value");
  // Save value
  astNumber.value = parseFloat(jsonValue);
  // Save original json
  astNumber.json = jsonNumber;
  // Done
  return astNumber;
};
