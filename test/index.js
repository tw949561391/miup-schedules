const MongoPool = require('../core/mongo');
const fs = require("fs");
const ObjectID = require('mongodb').ObjectID;

async function sss() {
    const db = await  MongoPool.acquire();
    const collection = db.collection("joke")


    let skip = 0;
    let jokes = [];

    do {
        jokes = await collection.find({type: 2}).skip(skip).limit(1).toArray();
        if (jokes.length > 0) {
            let joke = jokes[0];
            if (typeof joke.create_time === 'object') {
                await collection.updateOne({_id: new ObjectID(joke._id)}, {$set: {create_time: joke.create_time.getTime()}});
            }
            console.log(skip, joke._id);
            skip++
        } else {
        }
    } while (jokes.length > 0)
}


sss().then(() => {
    console.log('ok');
});


