const {requestPromise} = require('../../common/services/request-handler.service');

exports.list = async (req, res) => {
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

exports.getWeatherForecastById = async (req, res) => {
    const result = await requestPromise({
        url: `http://localhost:5122/caweatherforecast/${req.params.id}`,
        method: `GET`,
        rejectUnauthorized: false
    });

    res.setHeader('Content-Type', 'application/json');
    res.json(result);
}