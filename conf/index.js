let def = {
    dev: true,
    mongo: {
        uri: 'localhost',
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
            'static',
        domain:
            'http://oz54c721s.bkt.clouddn.com',
        zone: 'Zone_z0'
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



module.exports = require('./dev');
// module.exports = def;



