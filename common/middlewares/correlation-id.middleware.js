const logger = require('../serrvices/logger.service');

exports.getCorrelationId = (req, res, next) => {
    logger.log.info('Correlation ID');
    return next();
    // return res.status(400).send({error: 'need to pass refresh_token field'});
};