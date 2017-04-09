var utils = require("../../../../utils");
var Export = require("../Export");

Export.register("Expression", function (node, asFunction) {
  if (asFunction) {
    var str = Export.node("Expression", node);
    if (node.isAsync) {
      return str;
    } else {
      var f = "";
      f += "function(___n){";
      f += "___n(" + str + ");";
      f += "}";
      return f;
    }
  }
  else {
    return Export.node(node.content.ast_type, node.content);
  }
});
