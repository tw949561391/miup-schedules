const qiniu = require('../qiniu');


module.exports = {
    saveEntitys: async (entitys, db) => {
        let saveCount = 0;
        for (let i in entitys) {
            let entity = entitys[i];
            let old = await db.findOne({out_id: entity.out_id});
            // if (old) continue;
            console.log(entity);
            entity = this.saveFile(entity);
            console.log(entity);
            await db.insertOne(entity);
            saveCount++;
        }
        return saveCount;
    },
    saveFile: async (entity) => {
        let picsAf = [];
        let pics = entity.pics;
        pics.forEach(async (pic) => {
            let ps = pic.split('.');
            let res = await qiniu.saveStreamAndGetDownloadUrl(pic, 'demo/', ps[ps.length - 1]);
            picsAf.push(res.url);
        });
        entity.pics = picsAf;
        return entity;
    }
};