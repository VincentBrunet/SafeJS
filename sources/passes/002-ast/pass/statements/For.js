// Utils
var utils = require("../../../../utils");
var ast = require("../../../../ast");

// For ast structure
module.exports = function For(jsonFor) {
  // Current pass
  var pass = require("../../pass");
  // Check if it indeed a For
  pass.check.type(jsonFor, "For");
  // Check if we do have an expression and a block
  pass.check.child(jsonFor, "Expression");
  pass.check.child(jsonFor, "Block");
  // Read the For contents
  var jsonExpression = pass.read.child(jsonFor, "Expression");
  var jsonBlock = pass.read.child(jsonFor, "Block");
  // Make AST For node
  var astFor = new ast.For();
  // Make expression child
  astFor.expression = pass.make.Expression(jsonExpression);
  astFor.expression.parent = astFor;
  // Make block child
  astFor.block = pass.make.Block(jsonBlock);
  astFor.block.parent = astFor;
  // Save original json
  astFor.json = jsonFor;
  // Done
  return astFor;
};
