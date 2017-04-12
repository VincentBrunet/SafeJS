var utils = require("../../../../utils");
var Ast = require("../Ast");

Ast.register("For", function (node) {
  return node;
  // Node export
  node.export = function (context) {
    var _context = utils.context.clone(context);
    if (node.isAsync) {
      var str = "";
      str += "function(___n){";
      str += "_tjs._async._for(";
      str += node.condition.exportAsFunction(_context);
      str += ",";
      str += node.block.exportAsFunction(_context);
      str += ",___n)";
      str += "}";
      return str;
    }
    else {
      var str = "";
      str += "while(" + node.condition.export(_context) + "){";
      str += node.block.export(_context);
      str += "}";
      return str;
    }
  };

});
