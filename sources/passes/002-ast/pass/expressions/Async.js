// Utils
var utils = require("../../../../utils");
var ast = require("../../../../ast");

// Async ast structure
module.exports = function Async(jsonAsync) {
  // Current pass
  var pass = require("../../pass");
  // Check if it indeed a Async
  pass.check.type(jsonAsync, "Async");
  // Make AST Async node
  var astAsync = new ast.Async();
  // Check if variable has a name
  pass.check.child(jsonVariable, "Block");
  // Read name
  var jsonBlock = pass.read.child(jsonVariable, "Block");
  // Save name
  astAsync.block = pass.make.Block(jsonBlock);
  astAsync.block.parent = jsonVariable;
  // Check if it has a value
  if (pass.read.hasChild(jsonAsync, "Type")) {
    // Read Type content
    var jsonType = pass.read.child(jsonAsync, "Type");
    // Make Type node
    astAsync.type = pass.make.Type(jsonType);
    astAsync.type.parent = astAsync;
  }
  // Save original json
  astAsync.json = jsonAsync;
  // Done
  return astAsync;
};
