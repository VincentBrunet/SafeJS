var utils = require("../../../../utils");
var Export = require("../Export");

Export.register("Condition", function (node) {
  if (node.isAsync) {
    var checks = [];
    checks.push(node.if);
    utils._.each(node.else_ifs, function (else_if) {
      checks.push(else_if);
    });
    if (node.else) {
      checks.push(node.else);
    }
    var calls = [];
    utils._.each(checks, function (call) {
      var exp = "null";
      if (call.expression) {
        if (call.expression.isAsync) {
          exp = "[1," + Export.node("Expression", call.expression) + "]";
        }
        else {
          exp = "[0," + Export.node("Expression", call.expression) + "]";
        }
      }
      var blk = Export.node("Block", call.block, true);
      calls.push("[" + exp + "," + blk + "]");
    });
    var str = "";
    str += "function(" + Export.std.next + "){";
    str += Export.std.async + "._condition([";
    str += calls.join(",");
    str += "]," + Export.std.next + ");";
    str += "}";
    return str;
  }
  else {
    var str = "";
    str += "if(" + Export.node("Expression", node.if.expression) + "){";
    str += Export.node("Block", node.if.block);
    str += "}";
    utils._.each(node.else_ifs, function (else_if) {
      str += "else if(" + Export.node("Expression", else_if.expression) + "){";
      str += Export.node("Block", else_if.block);
      str += "}";
    });
    if (node.else) {
      str += "else{";
      str += Export.node("Block", node.else.block);
      str += "}";
    }
    return str;
  }
});
