const HttpRequest = require('request-promise');
module.exports = {
    query_datasource_get: async function (options, log) {
        let response = null;
        let errorTimes = 1;
        while (errorTimes <= 20) {
            try {
                response = await HttpRequest(options);
                break;
            } catch (e) {
                errorTimes++;
                log.error(`请求失败第${errorTimes}次：${e.message}`);
            }
        }
        return response;
    }
};





