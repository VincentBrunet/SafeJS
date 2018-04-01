// Utils
var utils = require("../../../../utils");
var ast = require("../../../../ast");

// Current pass
var pass = require("../../pass");

// Continue ast structure
module.exports = function Continue(jsonContinue) {
    // Check if it indeed a Continue
    pass.check.type(jsonContinue, "Continue");
    // Make AST Continue node
    var astContinue = new ast.Continue();
    // Save original json
    astContinue.json = jsonContinue;
    // Done
    return astContinue;
};
