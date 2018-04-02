// Utils
var utils = require("../../../../utils");
var ast = require("../../../../ast");

// Repeat ast structure
module.exports = function Repeat(jsonRepeat) {
  // Current pass
  var pass = require("../../pass");
  // Check if it indeed a Repeat
  pass.check.type(jsonRepeat, "Repeat");
  // Check if we do have an expression and a block
  pass.check.child(jsonRepeat, "Expression");
  pass.check.child(jsonRepeat, "Block");
  // Read the Repeat contents
  var jsonExpression = pass.read.child(jsonRepeat, "Expression");
  var jsonBlock = pass.read.child(jsonRepeat, "Block");
  // Make AST Repeat node
  var astRepeat = new ast.Repeat();
  // Make expression child
  astRepeat.expression = pass.make.Expression(jsonExpression);
  astRepeat.expression.parent = astRepeat;
  // Make block child
  astRepeat.block = pass.make.Block(jsonBlock);
  astRepeat.block.parent = astRepeat;
  // Save original json
  astRepeat.json = jsonRepeat;
  // Done
  return astRepeat;
};
