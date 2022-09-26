const cls = require('cls-hooked');
const uuid = require('uuid');

const store = cls.createNamespace('nursedash-correlation-id-namespace');

const CORRELATION_ID_KEY = 'CorrelationId';

function withId(fn, id) {
    store.run(() => {
        store.set(CORRELATION_ID_KEY, id || uuid.v4());
        fn();
    });
}

function getId() {
    return store.get(CORRELATION_ID_KEY);
}

module.exports = {
    withId,
    getId,
    bindEmitter: store.bindEmitter.bind(store),
    bind: store.bind.bind(store),
};