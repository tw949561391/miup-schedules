const service = require('./service');

service.saveStreamAndGetDownloadUrl("http://www.zbjuran.com/uploads/allimg/170821/15-1FR11GS6.gif", 'demo/', 'gif').then((res) => {
    console.log(res)
    service.deleteFile(res.key).then((o) => {
        console.log(o)
    }).catch(e => {
        console.log(e)
    });

}).catch(e => {
    console.log(e.message)
});



