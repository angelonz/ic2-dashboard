const Basejob = require('../Basejob');
const {ssdf} = require('../../configuration/feeds-config');

const job = new Basejob(ssdf);

module.exports.interval = ssdf.interval;
module.exports.promise = job.promise;