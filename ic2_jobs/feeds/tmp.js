const Basejob = require('../Basejob');
const {tmp} = require('../../configuration/feeds-config');

const job = new Basejob(tmp);

module.exports.interval = tmp.interval;
module.exports.promise = job.promise;