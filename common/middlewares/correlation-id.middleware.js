const correlator = require('../services/correlation-id.services');

const correlationIdMiddleware = (req, res, next) => {
    correlator.bindEmitter(req);
    correlator.bindEmitter(res);
    correlator.bindEmitter(req.socket);

    correlator.withId(() => {
        const currentCorrelationId = correlator.getId();
        res.set('CorrelationId', currentCorrelationId);
        next();
    }, req.get('CorrelationId'));
}

module.exports = {correlationIdMiddleware};