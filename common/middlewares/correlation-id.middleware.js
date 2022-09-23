const {createLogger} = require('../serrvices/logger.service');

const logger = createLogger();
exports.getCorrelationId = (req, res, next) => {
    logger.info('Correlation ID');
    return next();
    // return res.status(400).send({error: ''});
};