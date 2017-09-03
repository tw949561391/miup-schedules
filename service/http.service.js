const HttpRequest = require('request-promise');
module.exports = {
    query_datasource_get: async function (options) {
        let response = await HttpRequest(options);
        return response;
    }
};





