module.exports = {
    dev:true,
    mongo: {
        uri: 'miup.cc',
        port: '17017',
        dbName: 'joke'
    },
    qiniu: {
        ak: '65f-xBvwsecGWsUrUdU1tTGk3a0Z87LCTkyFOx0W',
        sk: 'jejMhQNTaImuhp5Y8GlC9v8mno6Kk3WjhOo-VTb5',
        bunket: 'test',
        domain: 'http://oyy55dglc.bkt.clouddn.com',
        zone:'Zone_z2'
    },
    log: {
        path: "./",
        log_conf_base: {
            appenders: {
                console: {type: 'console'},
                out: {type: 'stdout'}
            },
            categories: {default: {appenders: ['console', 'out'], level: 'debug'}}
        },
        replaceConsole: true
    }
};