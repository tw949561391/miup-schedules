const cheerio = require('cheerio');
const cryptoUtil = require('../core/util/crypto.util');
module.exports = {
    schedule: '0 30 */2 * * *',
    collection: 'joke',
    startpage: 1,
    request: {
        url: 'http://www.gaoxiaogif.cn/gif/%d/',
        transform: function (body) {
            return cheerio.load(body);
        }
    },
    parser: function ($,log) {
        return new Promise((resolve, reject) => {
            let resdata = [];
            try {
                $('body > div.site-w.index.clearfix > div.col1 > div > ul > li').each((i, e) => {
                        if ($(e).find('.showtxt').length > 0) {
                            let title = $(e).find('.showtxt')[0].children[0].data;
                            let pics = [];
                            let imgs = $(e).find('img.lazy');
                            imgs.each((i, img) => {
                                let srcImg = $(img)[0].attribs['data-original'];
                                if (srcImg) pics.push(srcImg);
                            });
                            if (pics.length > 0) {
                                let out_id = cryptoUtil.md5(title + pics[0]);
                                resdata.push({
                                    title: title,
                                    pics: pics,
                                    create_time: new Date(),
                                    out_id: out_id,
                                    type: 2,
                                    from: 'www.gaoxiaogif.cn'
                                })
                            }
                        }
                    }
                );
            } catch (e) {
                log.error(e)
            } finally {
                resolve(resdata)
            }
        })

    },
    qiniuParams: ['pics']

};