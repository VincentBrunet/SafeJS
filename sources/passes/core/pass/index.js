
/**
 * Pass class
 */
var Pass = function(name) {

  var self = this;

  self._internals = {
    name: name,
    types: {},
    predefined: {},
    handler: undefined,
  };

  self.register = function(type, call) {
    var inter = self._internals;
    if (inter.types[type]) {
      console.log("Duplicate type<" + type + "> for pass:", inter.name);
    }
    inter.types[type] = call;
  };

  self._last = undefined;

  self.node = function (type, obj, a, b, c, d) {
    var call = self._internals.types[type];
    var handler = self._internals.handler;
    if (handler) {
      self._last = [type, obj];
      return handler(type, obj, call, a, b, c, d);
    }
    if (!obj) {
      //console.log(name, "Pass empty node instead of:", type);
      //console.log("Last", self._last);
      return undefined;
    }
    if (obj.ast_type != type) {
      //console.log(name, "Pass wrong node type", obj.ast_type, type)
      //console.log("Last", self._last);
      return undefined;
    }
    if (!call) {
      //console.log(name, "Unknown node type", type);
      //console.log("Last", self._last);
      return undefined;
    }
    self._last = [type, obj];
    return call(obj, a, b, c, d);
  };

  self.handler = function (call) {
    self._internals.handler = call;
  };

  self.do = function (obj, a, b, c) {
    return self.node("Block", obj, a, b, c);
  };

  self.error = function (type, obj1, obj2) {
    return new Error(type + "::" + obj1 + "::" + obj2);
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
