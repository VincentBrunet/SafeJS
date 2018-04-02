// Utils
var utils = require("../../../../utils");
var ast = require("../../../../ast");

// Function ast structure
module.exports = function Function(jsonFunction) {
    // Current pass
    var pass = require("../../pass");
    // Check if it indeed a Function
    pass.check.type(jsonFunction, "Function");
    // Check if function has a body
    pass.check.child(jsonFunction, "Block");
    // Make AST Function node
    var astFunction = new ast.Function();
    // Optionally read function name
    if (pass.read.hasChild(jsonFunction, "Identifier")) {
      // Read identifier
      var jsonIdentifier = pass.read.child(jsonFunction, "Identifier");
      // Save identifier
      astFunction.identifier = pass.make.Identifier(jsonIdentifier);
      astFunction.identifier.parent = astFunction;
    }
    // Optionally read function type
    if (pass.read.hasChild(jsonFunction, "Type")) {
      // Read type json
      var jsonType = pass.read.child(jsonFunction, "Type");
      // Save type data
      astFunction.type = pass.make.Type(jsonType);
      astFunction.type.parent = astFunction;
    }
    // Optionally read function params
    if (pass.read.hasChild(jsonFunction, "Params")) {
      // Read params json
      var jsonParams = pass.read.child(jsonFunction, "Params");
      // Check if the type of the params
      pass.check.type(jsonParams, "FunctionParams");
      // Check if the params contains a list of param
      pass.check.childList(jsonParams);
      // Read param list
      var jsonParamsList = pass.read.childList(jsonParams);
      // Loop over all params
      utils._.each(jsonParamsList, function (jsonParam) {
        // Create ast param
        var astParam = {
          identifier: null,
          type: null,
          variadic: false,
          json: jsonParam,
        };
        // Optionally read the param name
        if (pass.read.hasChild(jsonParam, "Identifier")) {
          // Read param name
          var jsonIdentifier = pass.read.child(jsonParam, "Identifier");
          // Make param name
          astParam.identifier = pass.make.Identifier(jsonIdentifier);
          astParam.identifier.parent = astFunction;
        }
        // Optionally read the param type
        if (pass.read.hasChild(jsonParam, "Type")) {
          // Read param name
          var jsonType = pass.read.child(jsonParam, "Type");
          // Make param name
          astParam.type = pass.make.Type(jsonType);
          astParam.type.parent = astFunction;
        }
        // Check param variadic param
        pass.check.data(jsonParam, "Variadic");
        // Read param variadic
        astParam.variadic = pass.read.data(jsonParam, "Variadic");
        // Save param to function
        astFunction.params.push(astParam);
      });
    }
    // Save original json
    astFunction.json = jsonFunction;
    // Done
    return astFunction;
};
