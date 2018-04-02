// Utils
var utils = require("../../../../utils");
var ast = require("../../../../ast");

// While ast structure
module.exports = function While(jsonWhile) {
  // Current pass
  var pass = require("../../pass");
  // Check if it indeed a While
  pass.check.type(jsonWhile, "While");
  // Check if we do have an expression and a block
  pass.check.child(jsonWhile, "Expression");
  pass.check.child(jsonWhile, "Block");
  // Read the While contents
  var jsonExpression = pass.read.child(jsonWhile, "Expression");
  var jsonBlock = pass.read.child(jsonWhile, "Block");
  // Make AST While node
  var astWhile = new ast.While();
  // Make expression child
  astWhile.expression = pass.make.Expression(jsonExpression);
  astWhile.expression.parent = astWhile;
  // Make block child
  astWhile.block = pass.make.Block(jsonBlock);
  astWhile.block.parent = astWhile;
  // Save original json
  astWhile.json = jsonWhile;
  // Done
  return astWhile;
};
