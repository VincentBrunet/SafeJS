// Utils
var utils = require("../../../../utils");
var ast = require("../../../../ast");

// TryCatch ast structure
module.exports = function TryCatch(jsonTryCatch) {
  // Current pass
  var pass = require("../../pass");
  // Check if it indeed a TryCatch
  pass.check.type(jsonTryCatch, "TryCatch");
  // Make AST TryCatch node
  var astTryCatch = new ast.TryCatch();
  // Check if has at least an If
  pass.check.child(jsonTryCatch, "TryBlock");
  // Read if content
  var jsonTryBlock = pass.read.child(jsonTryCatch, "TryBlock");
  // Save try block
  astTryCatch.tryBlock = pass.make.Block(jsonTryBlock);
  astTryCatch.tryBlock.parent = astTryCatch;
  // Loop over optional catches
  var jsonCatches = pass.read.child("Catches");
  utils._.each(jsonCatches, function (jsonCatch) {
    // Check if "Catch" has identifier, type and block
    pass.check.child(jsonCatch, "Identifier");
    pass.check.child(jsonCatch, "Type");
    pass.check.child(jsonCatch, "Block");
    // Get contents
    var jsonCatchIdentifier = pass.read.child(jsonCatch, "Identifier");
    var jsonCatchType = pass.read.child(jsonCatch, "Type");
    var jsonCatchBlock = pass.read.child(jsonCatch, "Block");
    // Make catch
    var astCatch = {};
    // Read identifier
    astCatch.identifier = pass.make.Identifier(jsonCatchIdentifier);
    astCatch.identifier.parent = astTryCatch;
    // Read type
    astCatch.type = pass.make.Type(jsonCatchType);
    astCatch.type.parent = astTryCatch;
    // Read block
    astCatch.block = pass.make.Block(jsonCatchBlock);
    astCatch.block.parent = astTryCatch;
    // Save
    astTryCatch.catches.push(astCatch);
  });
  // If TryCatch has a "Finally"
  if (pass.read.hasChild(jsonTryCatch, "FinallyBlock")) {
    // Read finally content
    var jsonFinallyBlock = pass.read.child(jsonTryCatch, "FinallyBlock");
    // Make block
    astTryCatch.finallyBlock = pass.make.Block(jsonFinallyBlock);
    astTryCatch.finallyBlock.parent = astTryCatch;
  }
  // Save original json
  astTryCatch.json = jsonTryCatch;
  // Done
  return astTryCatch;
};

