var emailSender = require('./emailSender');

var config = require('../config.js');
var redis = config.getRedisClient();

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

let util = {

    saveToCache: function (name, data, next_time) {
        console.log(`updating ${name} data in Redis`, data);

        if (data.status === 500) {
            // inspect the old values
            redis.get(name, function(err, reply) {

                if(err) {
                    res.json({'error': err});
                } else {
                    
                    let reply_json;

                    if (reply !== null) {

                        // reply - data last saved in the cache
                        reply_json = JSON.parse(reply);
                        console.log('reply_json', reply_json);

                        if (reply_json.payload.status === 500) {
                            data.stateCycleCount = reply_json.payload.stateCycleCount;
                            data.stateCycleCount++;

                            data.timeFirstOccured = reply_json.payload.timeFirstOccured
                            if (data.stateCycleCount === 1) {
                                data.timeFirstOccured = data.time; 
                            }

                            // if the feed has been in status 500 more than 3 times, send email
                            if (data.stateCycleCount > 3) {
                                console.log('in HTTP 500 > 3 times.  sending email...');
                                emailSender.send(name, data);
                            }
                
                        } else {
                            // there was previous data but it wasn't in a 500 state
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

};

module.exports = util;

