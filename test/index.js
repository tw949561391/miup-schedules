const schedule = require('node-schedule');

let j =  schedule.scheduleJob('*/1 * * * * *', function () {
    console.log('ss')
});
