const Basejob = require('../Basejob');
const {congestion} = require('../../configuration/feeds-config');

const job = new Basejob(congestion);

module.exports.interval = congestion.interval;
module.exports.promise = job.promise;