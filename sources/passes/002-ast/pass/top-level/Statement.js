// Utils
var utils = require("../../../../utils");
var ast = require("../../../../ast");

// Statement ast structure
module.exports = function (jsonStatement) {
  // Current pass
  var pass = require("../../pass");
  // Possible statements content types
  var contentTypes = {
    "Block": pass.make.Block,
    "Break": pass.make.Break,
    "Condition": pass.make.Condition,
    "Continue": pass.make.Continue,
    "Expression": pass.make.Expression,
    "For": pass.make.For,
    "Repeat": pass.make.Repeat,
    "Resolve": pass.make.Resolve,
    "Return": pass.make.Return,
    "Throw": pass.make.Throw,
    "TryCatch": pass.make.TryCatch,
    "Variable": pass.make.Variable,
    "While": pass.make.While,
  };
  // Check if it indeed a statement
  pass.check.type(jsonStatement, "Statement");
  // Check if has a content child
  pass.check.child(jsonStatement, "Content");
  // Read content data
  var jsonContent = pass.read.child(jsonStatement, "Content")
  // Check if content is correctly typed
  pass.check.type(jsonContent, utils._.keys(contentTypes));
  // Make AST statement node
  var astStatement = new ast.Statement();
  // Save content type
  astStatement.type = pass.read.type(jsonContent);
  // Read content object, depending on type
  astStatement.content = contentTypes[astStatement.type](jsonContent);
  // Mark content as child
  astStatement.content.parent = astStatement;
  // Save original json
  astStatement.json = jsonStatement;
  // Done
  return astStatement;
};
