// Utils
var utils = require("../../../../utils");
var ast = require("../../../../ast");

// Resolve ast structure
module.exports = function Resolve(jsonResolve) {
  // Current pass
  var pass = require("../../pass");
  // Check if it indeed a Resolve
  pass.check.type(jsonResolve, "Resolve");
  // Make AST Resolve node
  var astResolve = new ast.Resolve();
  // Check if it has a value
  if (pass.read.hasChild(jsonResolve, "Expression")) {
    // Read expression content
    var jsonExpression = pass.read.child(jsonResolve, "Expression");
    // Make expression node
    astResolve.expression = pass.make.Expression(jsonExpression);
    astResolve.expression.parent = astResolve;
  }
  // Save original json
  astResolve.json = jsonResolve;
  // Done
  return astResolve;
};
