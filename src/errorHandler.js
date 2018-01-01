const debug = require('./debug');

module.exports = function(error) {
  debug('Error %O', error);
  process.exit(1);
};