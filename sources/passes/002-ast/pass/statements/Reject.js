// Utils
var utils = require("../../../../utils");
var ast = require("../../../../ast");

// Reject ast structure
module.exports = function Reject(jsonReject) {
  // Current pass
  var pass = require("../../pass");
  // Check if it indeed a Reject
  pass.check.type(jsonReject, "Reject");
  // Make AST Reject node
  var astReject = new ast.Reject();
  // Check if it has a value
  if (pass.read.hasChild(jsonReject, "Expression")) {
    // Read expression content
    var jsonExpression = pass.read.child(jsonReject, "Expression");
    // Make expression node
    astReject.expression = pass.make.Expression(jsonExpression);
    astReject.expression.parent = astReject;
  }
  // Save original json
  astReject.json = jsonReject;
  // Done
  return astReject;
};
