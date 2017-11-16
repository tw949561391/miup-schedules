const def = {
    mongo: {
        uri: '127.0.0.1',
        port:
            '17017',
        dbName:
            'joke'
    },
    qiniu: {
        ak: '65f-xBvwsecGWsUrUdU1tTGk3a0Z87LCTkyFOx0W',
        sk:
            'jejMhQNTaImuhp5Y8GlC9v8mno6Kk3WjhOo-VTb5',
        bunket:
            'joke-imgs',
        domain:
            'http://oyy55dglc.bkt.clouddn.com'
    },
    log: {
        path: "/var/log/node/miup-schedule/",
        log_conf_base:
            {
                appenders: {
                    console: {
                        type: 'console'
                    },
                    out: {
                        type: 'stdout'
                    }
                },
                categories: {
                    default:
                        {
                            appenders: ['console', 'out'], level: 'debug'
                        }
                }
            },
        replaceConsole: true
    }
};

// module.exports = require('./dev');
module.exports = def;



