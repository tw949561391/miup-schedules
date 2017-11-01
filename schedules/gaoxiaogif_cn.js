const cheerio = require('cheerio');
const cryptoUtil = require('../util/crypto.util');
module.exports = {
    schedule: '0 0 */1 * * *',
    // schedule: '*/1 * * * * *',
    collection: 'joke',
    startpage: 1,
    request: {
        url: 'http://www.gaoxiaogif.cn/gif/%d/',
        transform: function (body) {
            return cheerio.load(body);
        }
    },
    parser: function ($) {
        let resdata = [];
        $('body > div.site-w.index.clearfix > div.col1 > div > ul > li').each((i, e) => {
            let item = $(e).find('img.lazy')[0];
            if (item) {
                let title = $(e).find('span.showtxt')[0].children[0].data;
                let img = item.attribs['data-original'];
                let out_id = cryptoUtil.md5(title + img);
                resdata.push({
                    title: title,
                    pics: [img],
                    create_time: new Date(),
                    out_id: out_id,
                    type: 2
                })
            }
        });
        return resdata;
    }
};