const config = require('./common/config/env.config.js');
const productsRouter = require('./products/routes.config');
const {createLogger} = require('./common/serrvices/logger.service');
const axios = require('axios');

const express = require('express');
const app = express();

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});

app.use(express.json());
productsRouter.routesConfig(app);

(async () => {
    try {
        const awsInstanceId = await axios.get(config.awsInstanceIdUrl);
        const logger = createLogger(awsInstanceId);

        app.listen(config.port, function () {
            logger.info("app listening at port {portNumber}", {portNumber: config.port});
        });
    } catch (error) {
      console.log(error.response.body);
    }
  })();