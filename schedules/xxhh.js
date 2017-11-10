const cheerio = require('cheerio');
const cryptoUtil = require('../core/util/crypto.util');
module.exports = {
    schedule: '0 49 */2 * * *',
    collection: 'joke',
    startpage: 168,
    request: {
        url: 'http://www.xxhh.com/tag/%E5%8A%A8%E6%80%81%E5%9B%BE/page/%d/',
        transform: function (body) {
            return cheerio.load(body);
        }
    },
    parser: function ($,log) {
        return new Promise((resolve) => {
            let resdata = [];
            try {
                $('.article').each((i, e) => {
                    let pics = [];
                    if ($(e).find('img.lazyload')[0]) {
                        let img = $(e).find('img.lazyload')[0].attribs.tsrc;
                        if(img) pics.push(img);
                    }
                    let title = '';
                    if ($(e).children('pre')[0].children[0]) {
                        title = $(e).children('pre')[0].children[0].data;
                    }
                    if (pics.length > 0) {
                        let outId = cryptoUtil.md5(title + pics[0]);
                        resdata.push({
                            title: title,
                            pics: pics,
                            create_time: new Date(),
                            out_id: outId,
                            type: 2,
                            from: 'www.xxhh.com'
                        })
                    }
                });
            } catch (e) {
                log.error(e);
            } finally {
                resolve(resdata)
            }
        })
    },
    qiniuParams: ['pics']
};