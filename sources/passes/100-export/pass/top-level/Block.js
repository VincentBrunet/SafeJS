var utils = require("../../../../utils");
var Export = require("../Export");

Export.register("Block", function (node, asFunction) {
  // Export as a function
  if (asFunction) {
    var str = Export.node("Block", node);
    if (node.isAsync) {
      return str;
    }
    else {
      var f = "";
      f += "function(" + Export.std.next + "){";
      f += str;
      f += Export.std.next + "();";
      f += "}";
      return f;
    }
  }
  // Export normally
  else {
    var vars = [];
    utils._.each(node.statements, function (statement) {
      if (statement.isVariable) {
        vars.push(statement.content.name);
      }
    });
    // Async block
    if (node.isAsync) {
      var groups = [];
      utils._.each(node.statements, function (statement) {
        var gl = groups.length;
        if (gl <= 0 || groups[gl - 1].isAsync != statement.isAsync) {
          groups.push({
            isAsync: statement.isAsync,
            statements: []
          });
        }
        groups[groups.length - 1].statements.push(statement);
      });
      var calls = [];
      utils._.each(groups, function (group) {
        if (group.isAsync) {
          utils._.each(group.statements, function (statement) {
            calls.push(Export.node("Statement", statement));
            // calls.push("[1," + Export.node("Statement", statement) + "]");
          });
        }
        else {
          // var st = "[0,function(){";
          var st = "";
          st += "function(" + Export.std.next + "){";
          utils._.each(group.statements, function (statement) {
           st += Export.node("Statement", statement) + ";";
          });
          st += Export.std.next + "();";
          st += "}";
          // st += "}]";
          calls.push(st);
        }
      });
      var result = "";
      result += "function(" + Export.std.next + "){";
      if (vars.length > 0) {
        result += "var " + vars.join(",") + ";";
      }
      result += Export.std.async + "._block(";
      result += "[";
      result += calls.join(",");
      result += "]";
      result += "," + Export.std.next + ");";
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
        result += Export.node("Statement", statement) + ";";
      });
      return result;
    }
  }
});
