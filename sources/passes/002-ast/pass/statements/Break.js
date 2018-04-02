// Utils
var utils = require("../../../../utils");
var ast = require("../../../../ast");

// Break ast structure
module.exports = function Break(jsonBreak) {
  // Current pass
  var pass = require("../../pass");
  // Check if it indeed a Break
  pass.check.type(jsonBreak, "Break");
  // Make AST Break node
  var astBreak = new ast.Break();
  // Save original json
  astBreak.json = jsonBreak;
  // Done
  return astBreak;
};
