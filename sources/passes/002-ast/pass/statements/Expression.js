// Utils
var utils = require("../../../../utils");
var ast = require("../../../../ast");

// Current pass
var pass = require("../../pass");

// Possible Expressions content types
var contentTypes = {
  "Litteral": pass.make.Litteral,
  "Function": pass.make.Function,
  "Async": pass.make.Async,
  "Class": pass.make.Class,
  "Operation": pass.make.Operation,
  "Identifier": pass.make.Identifier,
};

// Expression ast structure
module.exports = function (jsonExpression) {
  // Check if it indeed a Expression
  pass.check.type(jsonExpression, "Expression");
  // Check if has a content child
  pass.check.child(jsonExpression, "Content");
  // Read content data
  var jsonContent = pass.read.child(jsonExpression, "Content")
  // Check if content is correctly typed
  pass.check.type(jsonContent, utils._.keys(contentTypes));
  // Make AST Expression node
  var astExpression = new ast.Expression();
  // Save content type
  astExpression.type = pass.read.type(jsonContent);
  // Read content object, depending on type
  astExpression.content = contentTypes[astExpression.type](jsonContent);
  // Mark content as child
  astExpression.content.parent = astExpression;
  // Save original json
  astExpression.json = jsonExpression;
  // Done
  return astExpression;
};

