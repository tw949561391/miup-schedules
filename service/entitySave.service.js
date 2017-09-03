module.exports = {
    saveEntitys: async (entitys, db) => {
        let saveCount=0;
        for (let i in entitys) {
            let entity = entitys[i];
            let old = await db.findOne({out_id: entity.out_id});
            if (old) continue;
            await db.insertOne(entity);
            saveCount++;
        }
        return saveCount;
    }
};