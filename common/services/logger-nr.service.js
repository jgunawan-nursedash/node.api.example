// New Relic Log Service
const winston = require('winston');
const config = require('../config/env.config');
const newrelicLogTransport = require('../transports/newrelic.transport');

// TODO: replace newrelicKey with your NewRelic license key
const httpTransportOptions = {
  licenseKey: "newrelicKey",
  apiUrl: "https://log-api.newrelic.com"
};

const createLoggerNr = (opts = {}) => {
  const {
    level = `verbose`,
    awsInstanceId,
    noAwsInstanceId = 'noAwsInstanceId',
    getCorrelationId,
    noCorrelationId = 'noCorrelationId'
  } = opts;

  return winston.createLogger({
    level,
    format: winston.format.combine(  /* This is required to get errors to log with stack traces. See https://github.com/winstonjs/winston/issues/1498 */
      winston.format((info) => {
        info.instanceId = awsInstanceId || noAwsInstanceId;
        info.CorrelationId = getCorrelationId() || noCorrelationId;
        return info;
      })(),
      winston.format.timestamp(),
      winston.format.errors({ stack: true }),
      winston.format.json(),
      winston.format.printf(({timestamp, instanceId, CorrelationId, level, message}) => {
        return `${timestamp} (${instanceId} ${CorrelationId}) - ${level}: ${message}`;
      })
    ),
    defaultMeta: { /* application: 'your-app-name' */ },
    transports: [
      new newrelicLogTransport(httpTransportOptions)
    ]
  });
}

module.exports = {
    createLoggerNr
};