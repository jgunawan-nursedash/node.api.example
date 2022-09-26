const winston = require('winston');
const { SeqTransport } = require('@datalust/winston-seq');
const config = require('../config/env.config');

const createLogger = (opts = {}) => {
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
      new SeqTransport({
        serverUrl: config.seqServerUrl,
        apiKey: config.seqApiKey,
        onError: (e => { console.error(e) }),
        handleExceptions: true,
        handleRejections: true,
      })
    ]
  });
}

module.exports = {
  createLogger
};