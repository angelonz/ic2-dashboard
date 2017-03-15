const Basejob = require('../Basejob');
const {cameras} = require('../../configuration/feeds-config');

const job = new Basejob(cameras);

module.exports.interval = cameras.interval;
module.exports.promise = job.promise;