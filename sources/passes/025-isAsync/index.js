// Basic utils
var utils = require("../../utils");

// Basic AST pass code
var IsAsync = require("./pass");

/**
 */
module.exports = function(session, astBefore, next) {
  try {
    IsAsync.do(astBefore);
    return next(true, astBefore);
  } catch (error) {
    return next(false, undefined, utils.trace.make(error));
  }
};
