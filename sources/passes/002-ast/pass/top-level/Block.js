// Utils
var utils = require("../../../../utils");
var ast = require("../../../../ast");

// Current pass
var pass = require("../../pass");

// Block ast structure
module.exports = function Block(jsonBlock) {
  // Check if it indeed a block
  pass.check.type(jsonBlock, "Block");
  // Check if we do have a list of statement here
  pass.check.childList(jsonBlock);
  // Read the block statements
  var jsonStatements = pass.read.childList(jsonBlock);
  // Make AST block node
  var astBlock = new ast.Block();
  // Create the block statements
  utils._.each(jsonStatements, function (jsonStatement) {
    // Make statement
    var astStatement = pass.make.Statement(jsonStatement);
    // Mark as child
    astStatement.parent = astBlock;
    // Save statement
    astBlock.statements.push(astStatement);
  });
  // Save original json
  astBlock.json = jsonBlock;
  // Done
  return astBlock;
};
