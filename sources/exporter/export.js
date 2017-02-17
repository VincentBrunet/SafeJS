var utils = require("../utils");

module.exports = function(session, next) {
  session.profilingStart("exporter");

  console.log("--- Export ---");
  console.log(session.getCompiledAst().export({
    depth: 0,
  }));

  session.profilingEnd("exporter");
  return next(true);
};
