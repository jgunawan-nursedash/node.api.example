const winston = require('winston');
const { SeqTransport } = require('@datalust/winston-seq');

const log = winston.createLogger({
    level: 'info',
    format: winston.format.combine(  /* This is required to get errors to log with stack traces. See https://github.com/winstonjs/winston/issues/1498 */
      winston.format.errors({ stack: true }),
      winston.format.json(),
    ),
    defaultMeta: { /* application: 'your-app-name' */ },
    transports: [
      new winston.transports.Console({
          format: winston.format.simple(),
      }),
      new SeqTransport({
        serverUrl: "http://localhost:5341",
        apiKey: "gxBp6iGlgVECwqO6R5Vk",
        onError: (e => { console.error(e) }),
        handleExceptions: true,
        handleRejections: true,
      })
    ]
  });

module.exports = {
    log
};