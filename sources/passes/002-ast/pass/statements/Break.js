// Utils
var utils = require("../../../../utils");
var ast = require("../../../../ast");

// Current pass
var pass = require("../../pass");

// Break ast structure
module.exports = function Break(jsonBreak) {
    // Check if it indeed a Break
    pass.check.type(jsonBreak, "Break");
    // Make AST Break node
    var astBreak = new ast.Break();
    // Save original json
    astBreak.json = jsonBreak;
    // Done
    return astBreak;
};
