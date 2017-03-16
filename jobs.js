var moment = require('moment');
var cacheUtil = require('./util/cacheUtil');

let jobsDir = '/ic2_jobs/feeds';
if (process.argv[2] === 'MOCK') {
  jobsDir = '/ic2_jobs/mock';
}

var jobs = require('require-all')(__dirname + jobsDir);

function update_widget(name, data, next_time) {

  data.stateCycleCount = 0;
  data.timeFirstOccured = null;
  
  cacheUtil.saveToCache(name, data, next_time);
}

function reschedule(job) {
  setTimeout(function() {start_recurring_job(job)}, job.interval)
}

function start_recurring_job(job) {
    new Promise(job.promise)
    .then(
      function(widget_data) {
        console.log('data from promise', widget_data);
        for (var widget in widget_data) {
          update_widget(widget, widget_data[widget], moment().add(job.interval, 'ms'));
        }
        reschedule(job);
      }
    )
    .catch(
      function(error) {
        console.log(error);
        reschedule(job);
      }
    );
}

for (var job in jobs) {
  console.log("Starting job: " + job)
  start_recurring_job(jobs[job]);
}
