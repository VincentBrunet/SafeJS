// Utils
var utils = require("../../../../utils");
var ast = require("../../../../ast");

// Throw ast structure
module.exports = function Throw(jsonThrow) {
  // Current pass
  var pass = require("../../pass");
  // Check if it indeed a Throw
  pass.check.type(jsonThrow, "Throw");
  // Make AST Throw node
  var astThrow = new ast.Throw();
  // Check if it has a value
  if (pass.read.hasChild(jsonThrow, "Expression")) {
    // Read expression content
    var jsonExpression = pass.read.child(jsonThrow, "Expression");
    // Make expression node
    astThrow.expression = pass.make.Expression(jsonExpression);
    astThrow.expression.parent = astThrow;
  }
  // Save original json
  astThrow.json = jsonThrow;
  // Done
  return astThrow;
};
