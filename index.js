const config = require('./common/config/env.config.js');
const weatherforecastRouter = require('./weatherforecast/routes.config');
const {createLogger} = require('./common/services/logger.service');
const correlationId = require('./common/services/correlation-id.services');
const {correlationIdMiddleware} = require('./common/middlewares/correlation-id.middleware');
const axios = require('axios');

const {createLoggerDd} = require('./common/services/logger-dd.service');
const { createLoggerNr } = require('./common/services/logger-nr.service.js');

const express = require('express');


(async () => {
    try {
        const app = express();
        app.use(correlationIdMiddleware);
        app.use(express.json());

        let instanceId = null;
        try {
            const res = await axios.get(config.awsInstanceIdUrl);
            instanceId = res.data;
        } catch (error) {
            console.log(error);
        }
        
        // Seq Logger
        const logger = createLogger({
            awsInstanceId: instanceId,
            getCorrelationId: correlationId.getId
        });

        // DataDog Logger
        const loggerDd = createLoggerDd({
            awsInstanceId: instanceId,
            getCorrelationId: correlationId.getId
        });

        // New Relic Logger
        const loggerNr = createLoggerNr({
            awsInstanceId: instanceId,
            getCorrelationId: correlationId.getId
        });

        weatherforecastRouter.routesConfig(app, loggerNr);

        app.listen(config.port, function () {
            // New Relic log
            loggerNr.log({
                level: 'info',
                message: `app listening at port ${config.port}`
            });
        });
    } catch (error) {
      console.log(error);
    }
  })();