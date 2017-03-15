const Basejob = require('../Basejob');
const {signs} = require('../../configuration/feeds-config');

const job = new Basejob(signs);

module.exports.interval = signs.interval;
module.exports.promise = job.promise;