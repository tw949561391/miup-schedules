const service = require('./service');

for (let i = 0; i <= 100; i++) {
    service.saveStreamAndGetDownloadUrlByTime("http://www.zbjuran.com/uploads/allimg/170821/15-1FR11GS6.gif").then((res) => {
        console.log(res);
        service.deleteFile(res.key).then((o) => {
            console.log(o)
        }).catch(e => {
            console.log(e)
        });
    }).catch(e => {
        console.log(e.message)
    });
}




