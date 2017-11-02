const cryptoUtil = require('../util/crypto.util');
module.exports = {
    schedule: '0 27 */3 * * *',
    startpage: 1,
    collection: 'joke',
    request: {
        url: 'http://ali-joke.showapi.com/textJoke?page=%d&maxResult=20&time=2000-01-01',
        headers: {"Authorization": `APPCODE 8c621a48625f4263b30413c394ff11b9`},
        transform: function (body) {
            return JSON.parse(body);
        }
    },
    parser: function (body) {
        let dataList=new Array();
        let list=body.showapi_res_body.contentlist;
        for(let l of list){
            let item={
                title:l.title,
                pics:[l.img],
                create_time:new Date(),
                out_id: cryptoUtil.md5(l.title + l.img),
                type:0
            };
            dataList.push(item);
        }
        return dataList;
    }
};