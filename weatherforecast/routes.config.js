const weatherForecastController = require('./controllers/weatherforecast.controller');
const loggerMiddleware = require('../common/middlewares/logger.middleware');
const asyncWrap = require('express-async-wrap');

exports.routesConfig = function (app, logger) {
    app.get('/weatherforecast', [
        asyncWrap(weatherForecastController.list)
    ]);
    app.get(`/weatherforecast/:id`, [
        loggerMiddleware.log(logger),
        asyncWrap(weatherForecastController.getWeatherForecastById),
    ]);
};