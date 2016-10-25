var utils = require("../utils");

module.exports = function(session, next) {
  session.profilingStart("exporter");
  session.profilingEnd("exporter");
  return next(true);
};
