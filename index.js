const config = require('./common/config/env.config.js');

const productsRouter = require('./products/routes.config');
const logger = require('./common/serrvices/logger.service');

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

app.listen(config.port, function () {
    logger.log.info("app listening at port {portNumber}", {portNumber: config.port});
});