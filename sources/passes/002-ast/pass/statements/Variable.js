// Utils
var utils = require("../../../../utils");
var ast = require("../../../../ast");

// Variable ast structure
module.exports = function Variable(jsonVariable) {
    // Current pass
    var pass = require("../../pass");
    // Check if it indeed a Variable
    pass.check.type(jsonVariable, "Variable");
    // Make AST Variable node
    var astVariable = new ast.Variable();
    // Check if variable has a name
    pass.check.child(jsonVariable, "Identifier");
    // Read name
    var jsonIdentifier = pass.read.child(jsonVariable, "Identifier");
    // Save name
    astVariable.Identifier = pass.make.Identifier(jsonIdentifier);
    astVariable.Identifier.parent = jsonVariable;
    // Check if it has a type
    if (pass.read.hasChild(jsonVariable, "Type")) {
        // Read type content
        var jsonType = pass.read.child(jsonVariable, "Type");
        // Make type node
        astVariable.type = pass.make.Type(jsonType);
        astVariable.type.parent = astVariable;
    }
    // Check if it has a value
    if (pass.read.hasChild(jsonVariable, "Expression")) {
        // Read expression content
        var jsonExpression = pass.read.child(jsonVariable, "Expression");
        // Make expression node
        astVariable.expression = pass.make.Expression(jsonExpression);
        astVariable.expression.parent = astVariable;
    }
    // Save original json
    astVariable.json = jsonVariable;
    // Done
    return astVariable;
};
