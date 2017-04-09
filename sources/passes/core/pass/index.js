
/**
 * Pass class
 */
var pass = function(name) {

  var self = this;

  self._internals = {
    name: name,
    types: {},
  };

  self.register = function(type, call) {
    var inter = self._internals;
    if (inter.types[type]) {
      console.log("Duplicate type<" + type + "> for pass:", inter.name);
    }
    inter.types[type] = call;
  };

  self.node = function (type, obj) {
    if (!obj) {
      console.log("Pass empty node instead of:", type);
      return undefined;
    }
    if (obj.ast_type != type) {
      console.log("Pass wrong node type", obj.ast_type, type)
      return undefined;
    }
    var call = self._internals.types[type];
    if (!call) {
      console.log("Unknown node type", type);
      return undefined;
    }
    return call(obj);
  };

  self.error = function (type, obj1, obj2) {

  };


};

module.exports = pass;
