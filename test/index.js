const MongoPool = require('../core/mongo');
const fs = require("fs");
const ObjectID = require('mongodb').ObjectID;

async function sss() {
    const db = await  MongoPool.acquire();
    const collection = db.collection("joke")


    await collection.createIndex("_create_time_",{
        "create_time":1
    });
    MongoPool.release(db);
    console.log("ok")
}


sss().then(() => {
    console.log('ok');
});


