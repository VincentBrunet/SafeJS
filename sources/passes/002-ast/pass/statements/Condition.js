// Utils
var utils = require("../../../../utils");
var ast = require("../../../../ast");

// Condition ast structure
module.exports = function Condition(jsonCondition) {
  // Current pass
  var pass = require("../../pass");
  // Check if it indeed a Condition
  pass.check.type(jsonCondition, "Condition");
  // Make AST Condition node
  var astCondition = new ast.Condition();
  // Check if has at least an If
  pass.check.child(jsonCondition, "If");
  // Read if content
  var jsonIf = pass.read.child(jsonCondition, "If");
  // Check if "If" has both an expression and a block
  pass.check.child(jsonIf, "Expression");
  pass.check.child(jsonIf, "Block");
  // Get if expression and block
  var jsonIfExpression = pass.read.child(jsonIf, "Expression");
  var jsonIfBlock = pass.read.child(jsonIf, "Block");
  // Save if expression
  astCondition.ifExpression = pass.make.Expression(jsonIfExpression);
  astCondition.ifExpression.parent = astCondition;
  // Save if block
  astCondition.ifBlock = pass.make.Block(jsonIfBlock);
  astCondition.ifBlock.parent = astCondition;
  // Loop over optional else ifs
  var jsonElseIfs = pass.read.child(jsonCondition, "ElseIfs");
  utils._.each(jsonElseIfs, function (jsonElseIf) {
    // Check if "ElseIf" has both expression and block
    pass.check.child(jsonElseIf, "Expression");
    pass.check.child(jsonElseIf, "Block");
    // Get else if expression and block
    var jsonElseIfExpression = pass.read.child(jsonElseIf, "Expression");
    var jsonElseIfBlock = pass.read.child(jsonElseIf, "Block");
    // Make else if
    var astElseIf = {};
    // Read expression
    astElseIf.expression = pass.make.Expression(jsonElseIfExpression);
    astElseIf.expression.parent = astCondition;
    // Read block
    astElseIf.block = pass.make.Block(jsonElseIfBlock);
    astElseIf.block.parent = astCondition;
    // Save else if
    astCondition.elseIfs.push(astElseIf);
  });
  // If condition has an "else"
  if (pass.read.hasChild(jsonCondition, "Else")) {
    // Read else content
    var jsonElse = pass.read.child(jsonCondition, "Else");
    // Check if else has a block
    pass.check.child(jsonElse, "Block");
    // Read else block content
    var jsonElseBlock = pass.read.child(jsonElse, "Block");
    // Make block
    astCondition.elseBlock = pass.make.Block(jsonElseBlock);
    astCondition.elseBlock.parent = astCondition;
  }
  // Save original json
  astCondition.json = jsonCondition;
  // Done
  return astCondition;
};

