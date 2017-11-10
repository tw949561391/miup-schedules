const schedule = require('node-schedule');
const Mongo = require('../core/mongo');
const Util = require('util');
const HttpService = require('./http.service');

const entitySaveService = require('./entitySave.service');


module.exports = function (conf, log) {
    log.info('创建定时任务成功');
    this.job = schedule.scheduleJob(conf.schedule, () => {
        let id = Date.now();
        log.info('---------------' + id + '-------------------------start')
        log.info('定时任务开始，创建数据库链接');
        run(conf, log).then(() => {
            log.info('定时任务结束，释放数据库链接');
            log.info('------------' + id + '----------------------------end')
        }).catch((e) => {
            log.error(e);
        })
    });
};

async function run(conf, log) {

    const client = await Mongo.acquire();
    const db = client.collection(conf.collection);
    try {
        //第一步，更具第一页url获取数据；
        let page = conf.startpage;
        let canNext = true;
        while (canNext) {
            try {
                let requestOptions = Object.assign({}, conf.request);
                requestOptions.url = Util.format(requestOptions.url, page);
                log.info(`获取第${page}页的数据开始,请求地址    ${requestOptions.url}`);
                let res = await HttpService.query_datasource_get(requestOptions, log);
                let datas = await conf.parser(res, log);
                log.info(`解析第　${page}页的数据完毕，获取${datas.length}条数据，开始保存。。。`);
                let isAllsaved = await entitySaveService.isAllSaved(datas, db);
                if (isAllsaved) {
                    log.info('这页数据都被保存了');
                    break
                }
                for (let entity of datas) {
                    let save = await  entitySaveService.saveEntity(entity, db, conf.qiniuParams, log);
                    log.info(`实体保存${save ? '成功' : '失败'}：${entity.title}`);
                }
            } catch (e) {
                log.error(e);
            } finally {
                page++
            }
        }
    } catch (e) {
        log.error(e);
    } finally {
        Mongo.release(client);

    }
}

module.exports.run = run;






