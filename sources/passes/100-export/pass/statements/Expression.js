var utils = require("../../../../utils");
var Export = require("../Export");

Export.register("Expression", function (node, asFunction) {
  if (asFunction) {
    var str = Export.node("Expression", node);
    if (node.isAsync) {
      return str;
    } else {
      var f = "";
      f += "function(" + Export.std.next + "){";
      f += Export.std.next + "(" + str + ");";
      f += "}";
      return f;
    }
  }
  else {
    return Export.node(node.content.ast_type, node.content);
  }
});
