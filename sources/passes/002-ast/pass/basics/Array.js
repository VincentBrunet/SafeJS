// Utils
var utils = require("../../../../utils");
var ast = require("../../../../ast");

// Array ast structure
module.exports = function Array(jsonArray) {
  // Current pass
  var pass = require("../../pass");
  // Check if it indeed a Array
  pass.check.type(jsonArray, "Array");
  // Check if we do have a list of Expression here
  pass.check.childList(jsonArray);
  // Read the Array Expressions
  var jsonExpressions = pass.read.childList(jsonArray);
  // Make AST Array node
  var astArray = new ast.Array();
  // Create the Array Expressions
  utils._.each(jsonExpressions, function (jsonExpression) {
    // Make Expression
    var astExpression = pass.make.Expression(jsonExpression);
    // Mark as child
    astExpression.parent = astArray;
    // Save Expression
    astArray.expressions.push(astExpression);
  });
  // Save original json
  astArray.json = jsonArray;
  // Done
  return astArray;
};
