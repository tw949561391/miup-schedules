const cryptoUtil = require('../core/util/crypto.util');
module.exports = {
    schedule: '0 0 */6 * * *',
    startpage: 1,
    collection: 'joke',
    request: {
        url: 'http://ali-joke.showapi.com/gifJoke?page=%d&maxResult=20&time=1950-01-01',
        headers: {"Authorization": `APPCODE 8c621a48625f4263b30413c394ff11b9`},
        transform: function (body) {
            return JSON.parse(body);
        }
    },
    parser: function (body,log) {
        return new Promise((resolve, reject) => {
            let dataList = new Array();
            try {
                let list = body.showapi_res_body.contentlist;
                for (let l of list) {
                    let pics = [];
                    if (l.img) {
                        pics.push(l.img);
                    }
                    let item = {
                        title: l.title,
                        pics: pics,
                        create_time: Date.now(),
                        out_id: cryptoUtil.md5(l.title + l.img),
                        type: 2,
                        from: 'ali-joke.showapi.com'
                    };
                    dataList.push(item);
                }
            } catch (e) {
                log.error(e);
            } finally {
                resolve(dataList);
            }
        })
    },
    qiniuParams: ['pics']

};