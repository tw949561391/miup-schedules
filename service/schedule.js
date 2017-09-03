const schedule = require('node-schedule');
const Mongo = require('../datasource/mongo');
const Util = require('util');
const HttpService = require('./http.service');

const entitySaveService = require('./entitySave.service');


module.exports = function (conf,log) {
    log.info('创建定时任务成功')
    this.job = schedule.scheduleJob(conf.schedule, async () => {
            log.info('----------------------------------------start')
            log.info('定时任务开始，创建数据库链接');
            const client = await Mongo.acquire();
            const db = client.collection(conf.collection);
            try {
                //第一步，更具第一页url获取数据；
                let page = conf.startpage-1;
                let canNext = true;
                do {
                    page++;
                    let url = Util.format(conf.request.url, page);
                    log.info(`获取第${page}页的数据开始,请求地址${url}`);
                    let res = await HttpService.query_datasource_get({url: url,headers:conf.request.headers, transform: conf.request.transform});
                    log.info(`获取第${page}页的数据结束`);
                    let datas=[];

                    try{
                        datas = conf.parser(res);
                    }catch(e){
                        log.error(e);
                        log.error('解析实体失败')
                    }
                    log.info(`解析第　${page}页的数据完毕，获取${datas.length}条数据，开始保存。。。`);
                    let savecount = await  entitySaveService.saveEntitys(datas, db);
                    log.info(`保存完毕，共保存了${savecount}条数据`);
                    if (0 === savecount||0===datas.length) {
                        canNext = false;
                        log.info(`该次请求的${datas.length}条数据，都已经被保存！所以可知后面都已经保存，跳出循环`)
                    }
                } while (canNext);
            } catch (e) {
                log.error(e);
            } finally {
                log.info('定时任务结束，释放数据库链接')
                Mongo.release(client);
                log.info('----------------------------------------end')
            }
        }
    );
};


