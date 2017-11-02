const qiniu = require('../qiniu');
const UUID = require('uuid');
module.exports = {
    saveEntitys: async (entitys, db) => {
        let saveCount = 0;
        for (let i in entitys) {
            let entity = entitys[i];
            let old = await db.findOne({out_id: entity.out_id});
            if (old) continue;
            let pics = [];
            for (let pic of entity.pics) {
                pic = await saveFile(pic);
                pics.push(pic);
            }
            entity.pics = pics;
            await db.insertOne(entity);
            saveCount++;
        }
        return saveCount;
    },

};


let saveFile = async (url) => {
    let ps = url.split('.');
    let type = 'img';
    if (ps.length > 1) {
        type = ps[ps.length - 1]
    }
    let path = UUID.v4();
    path = path.replace(/-/g, '/');
    path = path + '/';
    try {
        let res = await qiniu.saveStreamAndGetDownloadUrl(url, path, type);
        return res.url;
    } catch (e) {
        console.log(e);
        return url;
    }
};