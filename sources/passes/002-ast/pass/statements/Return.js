// Utils
var utils = require("../../../../utils");
var ast = require("../../../../ast");

// Return ast structure
module.exports = function Return(jsonReturn) {
    // Current pass
    var pass = require("../../pass");
    // Check if it indeed a Return
    pass.check.type(jsonReturn, "Return");
    // Make AST Return node
    var astReturn = new ast.Return();
    // Check if it has a value
    if (pass.read.hasChild(jsonReturn, "Expression")) {
        // Read expression content
        var jsonExpression = pass.read.child(jsonReturn, "Expression");
        // Make expression node
        astReturn.expression = pass.make.Expression(jsonExpression);
        astReturn.expression.parent = astReturn;
    }
    // Save original json
    astReturn.json = jsonReturn;
    // Done
    return astReturn;
};
