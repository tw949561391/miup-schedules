const cheerio = require('cheerio');
const cryptoUtil = require('../util/crypto.util');
const Iconv = require('iconv-lite');
module.exports = {
    schedule: '0 0 */1 * * *',
    // schedule: '*/1 * * * * *',

    collection: 'joke',
    startpage:2,
    request: {
        url: 'http://www.gaoxiaogif.com/index_%d.html',
        transform: function (body) {
            res=Iconv.decode(res, 'gb2312').toString();
            return cheerio.load(body);
        }
    },
    parser: function ($) {
        let resdata = [];
        $('.listgif-box').each((i, e) => {
            let item=$(e).find('div.listgif-giftu > p > img')[0]
            if(item){
                let title=item.attribs['alt'];
                let img=item.attribs['gifsrc'];
                let out_id= cryptoUtil.md5(title + img);
                resdata.push({
                    title: title,
                    pics: [img],
                    create_time: new Date(),
                    out_id:out_id,
                    type:2
                })
            }
        });
        return resdata;
    }
};