const logger = require('../../common/serrvices/logger.service');

exports.list = (req, res) => {
    logger.log.info('List all the product controller list');
    
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