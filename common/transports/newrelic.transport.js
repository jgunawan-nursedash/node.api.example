const TransportStream = require('winston-transport');
const axios = require('axios');
const { LEVEL, MESSAGE } = require('triple-beam');

module.exports = class Newrelic extends TransportStream {
    constructor(options = { licenseKey: '', apiUrl: '' }) {
        super(options);
        this.info = null;
        this.axiosClient = axios.create({
            baseURL: options.apiUrl,
            timeout: 10000,
            headers: {
                'Api-Key': options.licenseKey,
                'Content-Type': 'application/json'
            }
        });
    }

    log(info, callback) {
        this.info = info
        setImmediate(() => this.emit('logged', info));
        this.axiosClient.post('/log/v1', {
            timestamp: Date.now(),
            message: info[MESSAGE],
            logtype: info[LEVEL],
            CorrelationId: info["CorrelationId"]
        }).catch(err => {
            console.log(err);
        });

        callback();
    }
};
