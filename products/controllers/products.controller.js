const {createLogger} = require('../../common/serrvices/logger.service');

const logger = createLogger();
exports.list = (req, res) => {
    logger.info('List all the product controller list');
    
    const products = [
        {
          id: 1,
          name: "hammer",
        },
        {
          id: 2,
          name: "screwdriver",
        },
        ,
        {
          id: 3,
          name: "wrench",
        },
      ];
   
     res.json(products);
}