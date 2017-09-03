// const http_service = require('../service/http.service');
// const cheerio = require('cheerio');
//
// const options = {
//     url: 'http://www.baidu.com',
//     transform: function (body) {
//         return cheerio.load(body)
//     }
//
// };
//
// http_service.query_datasource_get(options).then((res) => {
//     console.log(res)
// });
const Logger=require('log4js');
const xxhh=require('../schedules/xxhh');



const s=require('../service/schedule');

new s(xxhh,Logger.getLogger());
