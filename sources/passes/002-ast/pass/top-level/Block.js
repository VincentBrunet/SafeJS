var utils = require("../../../../utils");
var Ast = require("../Ast");

Ast.register("Block", function (node) {
  // Node logic
  node.statements = [];
  utils._.each(node.ast_childs, function (statement) {
    node.statements.push(Ast.node("Statement", statement));
  });

  node.variables = function () {
    var vars = [];
    utils._.each(node.statements, function (statement) {
      if (statement.isVariable) {
        vars.push(statement.content.name);
      }
    });
    return vars;
  };

  // Node export
  node.exportAsFunction = function (context) {
    var str = node.export(context);
    if (node.isAsync) {
      return str;
    }
    else {
      var f = "";
      f += "function(___n){";
      f += str;
      f += "___n();";
      f += "}";
      return f;
    }
  };
  node.export = function (context) {
    var _context = utils.context.clone(context);
    var vars = node.variables();
    // Async block
    if (node.isAsync) {
      var calls = [];
      utils._.each(node.statements, function (statement) {
        if (statement.isAsync) {
          calls.push(statement.export(_context));
        }
        else {
          var st = "function(___n){";
          st += statement.export(_context) + ";";
          st += "___n();";
          st += "}";
          calls.push(st);
        }
      });
      var result = "";
      result += "function(___n){";
      if (vars.length > 0) {
        result += "var " + vars.join(",") + ";";
      }
      result += "_tjs._async._block([\n";
      result += calls.join(",\n");
      result += "],___n);\n";
      result += "}";
      return result;
    }
    // Sync block
    else {
      var result = "";
      if (vars.length > 0) {
        result += "var " + vars.join(",") + ";";
      }
      utils._.each(node.statements, function (statement) {
        result += statement.export(_context) + ";";
      });
      return result;
    }
  };

});
