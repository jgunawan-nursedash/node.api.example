exports.log = (logger, message) => {
    return (req, res, next) => {
        //logger.info(req.path); // Data Dog simple log info
        // New Relic Log example
        logger.log({
            level: 'info',
            message: `invoke request ${req.path}`
        })
        return next();
    };
};