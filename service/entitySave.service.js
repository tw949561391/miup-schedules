module.exports = {
    saveEntity: async (entity, db) => {
        let old = await db.findOne({out_id: entity.out_id});
        if (old) {
            return false;
        }
        await db.insertOne(entity);
        return true;

    },

};
