exports.log = (logger, message) => {
    return (req, res, next) => {
        logger.info(req.path);
        return next();
    };
};