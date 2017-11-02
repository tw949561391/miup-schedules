const cheerio = require('cheerio');
const cryptoUtil = require('../util/crypto.util');
module.exports = {
    schedule: '0 20 */3 * * *',
    // schedule: '*/1 * * * * *',
    collection: 'joke',
    startpage:1,
    request: {
        url: 'http://www.xxhh.com/tag/%E5%8A%A8%E6%80%81%E5%9B%BE/page/%d/',
        transform: function (body) {
            return cheerio.load(body);
        }
    },
    parser: function ($) {
        let resdata = [];
        $('.article').each((i, e) => {
            let gif=null;
            if($(e).find('img.lazyload')[0]){
                gif = $(e).find('img.lazyload')[0].attribs.tsrc;
            }
            let title = null;
            if ($(e).children('pre')[0].children[0]) {
                title = $(e).children('pre')[0].children[0].data;
            }
            if(gif){
                resdata.push({
                    title: title,
                    pics: [gif],
                    create_time: new Date(),
                    out_id: cryptoUtil.md5(title + gif),
                    type:2
                })
            }

        });
        return resdata;
    }
};