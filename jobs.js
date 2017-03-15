var config = require(__dirname + '/config.js');
var redis = config.getRedisClient();

var moment = require('moment');
const nodemailer = require('nodemailer');
var smtpTransport = require("nodemailer-smtp-transport");


// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      type: 'OAuth2',
      user: 'ic2.dashboard@gmail.com',
      refreshToken: '1/YpCLb6jDzAYF7ouC_tqmX1jNnjIGx-Gg5RoU1OUDXkE',
      clientId: '719528510666-4no6i07egne6r8ii6214p4321cg9o6j7.apps.googleusercontent.com',
      clientSecret: '4sggDA-uaVm0hmEpxNZvomNa',
      accessToken: 'ya29.GlsOBMB0iK0_wnf5gRFXj7t6cPbN4quXTUGRZ_cgg9PDM7pgcAQvDm4IE_DYEo2A2lL3VF6dpeABPVhoc6-2hEh-7a48cooyeB5kXT1UE-aOWQXkXrXd5hCT3syd',
      expires: 3600
  }
  
});

let jobsDir = '/ic2_jobs/feeds';
if (process.argv[2] === 'MOCK') {
  jobsDir = '/ic2_jobs/mock';
}

var jobs = require('require-all')(__dirname + jobsDir);

function saveToRedis(name, data, next_time) {
  redis.set(name, JSON.stringify({
    payload: data,
    next_time: next_time
  }), function(err, res) {
    if(err) {
      console.log(err);
    }
  });
}

function update_widget(name, data, next_time) {

  data.stateCycleCount = 0;
  data.timeFirstOccured = null;

  console.log(`updating ${name} data in Redis`, data);

  if (data.status === 500) {
    // inspect the old values
    redis.get(name, function(err, reply) {
      if(err) {
        res.json({'error': err});
      } else {
        
        let reply_json;

        if (reply !== null) {

          reply_json = JSON.parse(reply);
          console.log('reply_json', reply_json);

          if (reply_json.payload.status === 500) {
            data.stateCycleCount = reply_json.payload.stateCycleCount;
            data.stateCycleCount++;

            data.timeFirstOccured = reply_json.payload.timeFirstOccured
            if (data.stateCycleCount === 1) {
              data.timeFirstOccured = data.time; 
            }


            if (data.stateCycleCount === 3) {
              console.log('in 500 3 times.  sending email...');

              // setup email data with unicode symbols
              let mailOptions = {
                  from: 'ic2.dashboard@gmail.com', // sender address
                  to: 'angelo.angeles@nz.fujitsu.com', // list of receivers
                  subject: `HTTP 500 - ${name}`, // Subject line
                  html: `<p> ${name} has been in Status 500 since ${data.timeFirstOccured} </p>` // html body
              };

              // send mail with defined transport object
              transporter.sendMail(mailOptions, (error, info) => {
                  if (error) {
                      return console.log(error);
                  }
                  console.log('Message %s sent: %s', info.messageId, info.response);
              });
              

            }
 

            console.log('is 500', data);

          } else {
            data.stateCycleCount = 1;
            data.timeFirstOccured = data.time;
          }

        } else {
          // no data found, increment the count and the timeFirstOccured
          data.stateCycleCount = 1;
          data.timeFirstOccured = data.time;
        } 
        
      }

      saveToRedis(name, data, next_time);

    });
  } else {
    saveToRedis(name, data, next_time);
  }

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
