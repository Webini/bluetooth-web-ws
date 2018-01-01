const debug = require('./debug');

function errorHandler(error) {
  debug('Error %O', error);
  process.exit(1);
}

errorHandler.handlePromise = function(fnPromise) {
  return function () {
    return fnPromise.apply(fnPromise, arguments).catch(errorHandler);
  };
};

module.exports = errorHandler;
