// prevents the use of undeclared variable
var appRoot = require('app-root-path');
var winston = require('winston');
// require('winston-mongodb');
var options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};
var logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    // new winston.transports.MongoDB({
    //   db: process.env.ATLAS_URI,
    //   collection: 'log',
    //   level: 'info',
    //   storeHost: true,
    //   capped: true,
    // }),
  ],
  exitOnError: false, // do not exit on handled exceptions
});
logger.stream = {
  write: function(message, encoding) {
    logger.info(message);
  },
};
module.exports = logger;
