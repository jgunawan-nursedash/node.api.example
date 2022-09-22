const ProductsController = require('./controllers/products.controller');
const CorrelationIdMiddleware = require('../common/middlewares/correlation-id.middleware');

exports.routesConfig = function (app) {
    app.get('/products', [
        CorrelationIdMiddleware.getCorrelationId,
        ProductsController.list
    ]);
};