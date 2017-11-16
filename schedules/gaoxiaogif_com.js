const cheerio = require('cheerio');
const cryptoUtil = require('../core/util/crypto.util');
const Iconv = require('iconv-lite');
module.exports = {
    schedule: '0 40 */6 * * *',
    collection: 'joke',
    startpage: 268,
    request: {
        url: 'http://www.gaoxiaogif.com/index_%d.html',
        transform: function (body) {
            let bf = new Buffer(body);
            let res = Iconv.decode(bf, 'GB2312').toString();
            return cheerio.load(res);
        },
        encoding: null,
    },
    parser: function ($, log) {
        return new Promise((resolve) => {
            let resdata = [];
            try {
                $('.listgif-box').each((i, e) => {
                    let title = '';
                    $(e).find(' div.listgif-title > h2 > a')[0].children.forEach(c => {
                        if (c.type === 'text') {
                            title = title + c.data
                        }
                    });
                    let pics = [];
                    $(e).find('div.listgif-giftu > p > img').each((i, c) => {
                        let imgsrc = $(c)[0].attribs['gifsrc'] || $(c)[0].attribs['src'];
                        if (imgsrc) {
                            pics.push(imgsrc)
                        }
                    });
                    if (pics.length > 0) {
                        let out_id = cryptoUtil.md5(title + pics[0]);
                        resdata.push({
                            title: title,
                            pics: pics,
                            create_time: new Date(),
                            out_id: out_id,
                            type: 2,
                            from: 'www.gaoxiaogif.com'
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
