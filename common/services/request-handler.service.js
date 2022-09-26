const requestPromise = require('request-promise-native');
const correlator = require('./correlation-id.services');

module.exports = {
    requestPromise: requestPromise.defaults({
        headers: {
            get 'CorrelationId'() {
                return correlator.getId();
            },
        },
    })
};