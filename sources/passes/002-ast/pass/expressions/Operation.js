// Utils
var utils = require("../../../../utils");
var ast = require("../../../../ast");

// Operation ast structure
module.exports = function Operation(jsonOperation) {
  // Current pass
  var pass = require("../../pass");
  // Check if it indeed a Operation
  pass.check.type(jsonOperation, "Operation");
  // Make AST Operation node
  var astOperation = new ast.Operation();
  // Check operator
  pass.check.data(jsonOperation, "op");
  // Read operator
  var jsonOperator = pass.read.data(jsonOperation, "op");
  // Save operator
  astOperation.operator = jsonOperator;
  // Check first expression
  pass.check.child(jsonOperation, "E1");
  var jsonExpression1 = pass.read.child(jsonOperation, "E1");
  astOperation.expression1 = pass.make.Expression(jsonExpression1);
  astOperation.expression1.parent = astOperation;
  // Optionally read second expression
  if (pass.read.hasChild(jsonOperation, "E2")) {
    var jsonExpression2 = pass.read.child(jsonOperation, "E2");
    astOperation.expression2 = pass.make.Expression(jsonExpression2);
    astOperation.expression2.parent = astOperation;
  }
  // Save original json
  astOperation.json = jsonOperation;
  // Done
  return astOperation;
};

