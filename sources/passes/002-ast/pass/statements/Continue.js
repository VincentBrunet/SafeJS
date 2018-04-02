// Utils
var utils = require("../../../../utils");
var ast = require("../../../../ast");

// Continue ast structure
module.exports = function Continue(jsonContinue) {
  // Current pass
  var pass = require("../../pass");
  // Check if it indeed a Continue
  pass.check.type(jsonContinue, "Continue");
  // Make AST Continue node
  var astContinue = new ast.Continue();
  // Save original json
  astContinue.json = jsonContinue;
  // Done
  return astContinue;
};
