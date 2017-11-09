const service = require('./service');

for (let i = 0; i <= 100; i++) {
    service.saveStreamAndGetDownloadUrlByTime("http://j0.cn/resource/images/logo.png").then((res) => {
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




