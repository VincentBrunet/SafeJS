// Utils
var utils = require("../../../../utils");
var ast = require("../../../../ast");

// Tuple ast structure
module.exports = function Tuple(jsonTuple) {
  // Current pass
  var pass = require("../../pass");
  // Check if it indeed a Tuple
  pass.check.type(jsonTuple, "Tuple");
  // Check if we do have a list of Expression here
  pass.check.childList(jsonTuple);
  // Read the Tuple Expressions
  var jsonExpressions = pass.read.childList(jsonTuple);
  // Make AST Tuple node
  var astTuple = new ast.Tuple();
  // Create the Tuple Expressions
  utils._.each(jsonExpressions, function (jsonExpression) {
    // Make Expression
    var astExpression = pass.make.Expression(jsonExpression);
    // Mark as child
    astExpression.parent = astTuple;
    // Save Expression
    astTuple.Expressions.push(astExpression);
  });
  // Save original json
  astTuple.json = jsonTuple;
  // Done
  return astTuple;
};
