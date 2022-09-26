const config = require('./common/config/env.config.js');
const weatherforecastRouter = require('./weatherforecast/routes.config');
const {createLogger} = require('./common/services/logger.service');
const correlationId = require('./common/services/correlation-id.services');
const {correlationIdMiddleware} = require('./common/middlewares/correlation-id.middleware');
const axios = require('axios');

const express = require('express');

(async () => {
    try {
        const app = express();
        app.use(correlationIdMiddleware);
        app.use(express.json());

        const instanceId = null;
        try {
            const res = await axios.get(config.awsInstanceIdUrl);
            instanceId = res.data;
        } catch (error) {
            console.log(error);
        }
        
        const logger = createLogger({
            awsInstanceId: instanceId,
            getCorrelationId: correlationId.getId
        });

        weatherforecastRouter.routesConfig(app, logger);

        app.listen(config.port, function () {
            logger.info("app listening at port {portNumber}", {portNumber: config.port});
        });
    } catch (error) {
      console.log(error);
    }
  })();