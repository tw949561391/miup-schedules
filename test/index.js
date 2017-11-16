const MongoPool = require('../core/mongo');
const fs = require("fs");

async function sss() {
    const client = await MongoPool.acquire();
    const db = client.collection('joke');
    let entitys = await db.find({type: 2});
    let n = await entitys.hasNext();
    let t = `<head>
	<meta charset="utf-8" />
<title>解铃网-加工平台-教辅作业预设</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta content="width=device-width, initial-scale=1.0" name="viewport" />
<meta content="j0.cn" name="description" />
<meta content="j0.cn" name="author" />
		</head><body class="page-header-fixed">`
    await appendTextTo(t);
    let c = 0;
    while (n ) {
        let entity = await entitys.next();
        let imasItem = '';
        if (entity && entity.pics) {
            entity.pics.forEach(pic => {
                let imgHtml = `<p><button onclick="window.open('${pic}')">${entity.title}</button></p>`
                imasItem += imgHtml;
            });
            let divItem = `<div >${imasItem}</div>`
            await appendTextTo(divItem);
            c++;
        }
    }
    let e = `</body></html>`;
    await appendTextTo(e);
}


async function appendTextTo(text) {
    return new Promise((resolve, reject) => {
        fs.writeFile('./index.html', text, {flag: 'a', encoding: 'utf-8', mode: '0666'}, function (err) {
            resolve();
        })
    })
}


sss().then(() => {
    console.log('ok');
});


