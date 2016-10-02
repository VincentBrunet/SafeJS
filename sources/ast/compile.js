var utils = require("../utils");

module.exports = function ast_compile(session, next) {
  utils.astDisplay(session.getParsedAst());
  return next(true);
};
