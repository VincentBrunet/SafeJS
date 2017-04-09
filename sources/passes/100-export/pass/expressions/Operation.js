var utils = require("../../../../utils");
var Export = require("../Export");

Export.register("Operation", function (node) {
  if (node.isAsync) {
    var str = "";
    str += "function(___n){";
    str += "_tjs._async._op(";
    str += "'" + node.op + "',";
    str += Export.node("Expression", node.e1, true) + ",";
    if (node.e2) {
      str += Export.node("Expression", node.e2, true) + "";
    }
    else {
      str += "null";
    }
    str += ",___n);";
    str += "}";
    return str;
  }
  else {
    var str = "";
    str += "_tjs._sync._op("
    str += "'" + node.op + "',";
    str += Export.node("Expression", node.e1);
    if (node.e2) {
      str += "," + Export.node("Expression", node.e2);
    }
    str += ")";
    return str;
  }
});
