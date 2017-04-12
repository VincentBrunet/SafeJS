
/**
 * Pass class
 */
var Pass = function(name) {

  var self = this;

  self._internals = {
    name: name,
    types: {},
    predefined: {},
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
      console.log(name, "Pass empty node instead of:", type);
      return undefined;
    }
    if (obj.ast_type != type) {
      console.log(name, "Pass wrong node type", obj.ast_type, type)
      return undefined;
    }
    var call = self._internals.types[type];
    if (!call) {
      console.log(name, "Unknown node type", type);
      return undefined;
    }
    return call(obj);
  };

  self.do = function (obj) {
    return self.node("Block", obj);
  };

  self.error = function (type, obj1, obj2) {

  };

  self.predefine = function (name, ctr) {
    // console.log("SavePredef", name);
    self._internals.predefined[name] = ctr;
  };
  self.predefined = function (name, a, b, c, d, e) {
    // console.log("ReadPredef", name);
    return (self._internals.predefined[name]).apply(undefined, [a, b, c, d, e]);
  };

};

module.exports = Pass;
