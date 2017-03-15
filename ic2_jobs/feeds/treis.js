const Basejob = require('../Basejob');
const {treis} = require('../../configuration/feeds-config');
const moment = require('moment');

const job = new Basejob(treis);

module.exports.interval = treis.interval;
module.exports.promise = job.promise;