// DataDog Log Service
const winston = require('winston');
const config = require('../config/env.config');

// TODO: replace datadogKey with your datadog license key
const httpTransportOptions = {
    host: 'http-intake.logs.datadoghq.com',
    path: '/api/v2/logs?dd-api-key=datadogKey&ddsource=nodejs&service=node-dd-web-api',
    ssl: true
  };

const createLoggerDd = (opts = {}) => {
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
      new winston.transports.Console({
          format: winston.format.simple(),
          handleExceptions: true
      }),
      new winston.transports.Http(httpTransportOptions)
    ]
  });
}

module.exports = {
    createLoggerDd
};