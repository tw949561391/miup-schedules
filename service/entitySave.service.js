const Util = require('util');
const Qiniu = require('../core/qiniu');
const conf = require('../conf');
module.exports = {
    saveEntity: async (entity, db, saveEntityParams, log) => {
        try {
            //先把要保存的七牛云的参数保存起来
            entity = await saveQiniuByParams(entity, saveEntityParams, log);
            //查找是否存在
            let old = await db.findOne({out_id: entity.out_id});
            if (old) {//  已经存在
                log.info('对象存在');
                if (conf.dev) {
                    return true;
                } else {
                    return true;
                }
            } else { //不存在
                log.info('对象不存在');
                await db.insertOne(entity);
                return true;
            }
        } catch (e) {
            return true;
        }
    },
};


async function saveQiniuByParams(entity, saveEntityParams, log) {
    if (saveEntityParams && saveEntityParams instanceof Array) {
        for (let param of saveEntityParams) {
            if (!Util.isNullOrUndefined(entity[param])) {
                if (entity[param] instanceof String) {
                    let res = await Qiniu.saveStreamAndGetDownloadUrlByTime(entity[param], log);
                    entity[param] = res.url;
                    entity[param + '_qiniu_key'] = res.id;
                } else if (entity[param] instanceof Array) {
                    let saveds = [];
                    let qiniuKeys = [];
                    for (let p of entity[param]) {
                        if (p) {
                            let saved = await Qiniu.saveStreamAndGetDownloadUrlByTime(p, log);
                            saveds.push(saved.url);
                            qiniuKeys.push(saved.key)
                        }
                    }
                    entity[param] = saveds;
                    entity[param + '_qiniu_keys'] = qiniuKeys;
                }
            }
        }
    }
    return entity;
}
