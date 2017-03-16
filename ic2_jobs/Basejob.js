const request = require('request');
const HttpsProxyAgent = require('https-proxy-agent');
const {proxy} = require('../configuration/env-config');
const {ic2Header} = require('../configuration/feeds-config');

//const moment = require('moment');
const moment = require('moment-timezone');
const assign = require('lodash/assign');

const agent = new HttpsProxyAgent(proxy);


let baseOptions = {
	headers: ic2Header
};



function Basejob(params) {

	const options = params || {};

	if (process.env.NODE_ENV !== 'production') {
		baseOptions = assign({}, baseOptions, {agent: agent});
	}

	// create a new object containing the baseOptions value and the passed-in options object
	let combinedOptions = assign({}, baseOptions, options);
	
	this.promise = (fulfill, reject) => {

		// this will perform a get request
		request(combinedOptions, (error, response, body) => {

			if (!error) {
				let data = {}; 

				// this creates a property to the empty object with name being the value of combinedOptions.name
				// ex data = { treis: {status: 200, time: 'Wednesday, November 9, 2016 10:33 AM'}}
				data[combinedOptions.name] = {
		      			status: response.statusCode,
		      			time: moment().tz('Pacific/Auckland').format('llll')
		      		};

		      	// all good, resolve the promise	
		      	fulfill(data);
		    } else {
		    	// something went wrong, reject the promise
		      	reject(error);
		    }
		});
	}
	
};

module.exports = Basejob;