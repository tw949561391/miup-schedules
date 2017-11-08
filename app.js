const rd = require('rd');
const path = require('path');
const Logger = require('log4js');
const LogConf = require('./conf').log;
const Conf = require('./conf');
const Schudule = require('./service/schedule');


module.exports = {
    bootstrap: function () {
        let schdules = [];
        let fs = rd.readFileSync(path.join(__dirname, 'schedules/'));
        let log_conf_base = LogConf.log_conf_base;
        fs.forEach(f => {
            let sps = f.split(path.sep);
            let filename = sps[sps.length - 1];
            let schduleName = filename.split('.')[0];
            log_conf_base.appenders[schduleName] = {
                type: 'dateFile',
                filename: `${LogConf.path}logs/${schduleName}.log`,
                pattern: '.yyyy-MM-dd'
            };
            log_conf_base.categories[schduleName] = {
                appenders: Conf.dev ? [schduleName, 'out'] : [schduleName],
                level: 'debug'
            };
            let schdule = {
                file: f,
                name: schduleName
            };
            schdules.push(schdule);
        });

        Logger.configure(log_conf_base);

        schdules.forEach(s => {
            const sc = require(s.file);
            new Schudule(sc, Logger.getLogger(s.name));
        })
    }
};