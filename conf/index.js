module.exports.mongo = {
    uri: 'miup.cc',
    port: '17017',
    dbName: 'joke-test'
};

module.exports.qiniu = {
    ak: '65f-xBvwsecGWsUrUdU1tTGk3a0Z87LCTkyFOx0W',
    sk: 'jejMhQNTaImuhp5Y8GlC9v8mno6Kk3WjhOo-VTb5',
    bunket: 'miup-public',
    domain: 'http://ourg6hmwj.bkt.clouddn.com'
};

module.exports.log = {
    path: "/var/log/schdule/miup-schedules/",
    log_conf_base: {
        appenders: {
            console: {type: 'console'},
        },
        categories: {default: {appenders: ['console'], level: 'debug'}}
    }
};
