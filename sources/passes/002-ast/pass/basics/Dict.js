// Utils
var utils = require("../../../../utils");
var ast = require("../../../../ast");

// Dict ast structure
module.exports = function Dict(jsonDict) {
  // Current pass
  var pass = require("../../pass");
  // Check if it indeed a Dict
  pass.check.type(jsonDict, "Dict");
  // Make AST Dict node
  var astDict = new ast.Dict();
  /*
  // Check if we do have a list of Expression here
  pass.check.childList(jsonDict);
  // Read the Dict Expressions
  var jsonExpressions = pass.read.childList(jsonDict);
  // Create the Dict Expressions
  utils._.each(jsonExpressions, function (jsonExpression) {
    // Make Expression
    var astExpression = pass.make.Expression(jsonExpression);
    // Mark as child
    astExpression.parent = astDict;
    // Save Expression
    astDict.Expressions.push(astExpression);
  });
  */
  // Save original json
  astDict.json = jsonDict;
  // Done
  return astDict;
};
