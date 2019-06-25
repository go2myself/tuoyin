/* eslint-disable max-len */
// const winston = require('winston');

// const logger = new (winston.Logger)({
//   transports: [
//     new (winston.transports.Console)({
//       json: true,
//       colorize: true
//     })
//   ]
// });
const winston = require('winston');
const expressWinston = require('express-winston');

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  // optional: control whether you want to log the meta data about the request (default to true)
  meta: false,
  msg: 'HTTP {{req.method}} {{req.url}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  expressFormat: false,
  // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  colorize: false,
  ignoreRoute: () => false // optional: allows to skip some log messages based on request and/or response
});
const errorLogger = expressWinston.errorLogger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  msg: 'HTTP {{req.method}} {{req.url}}',
});
exports.requestLogger = requestLogger;
exports.errorLogger = errorLogger;
