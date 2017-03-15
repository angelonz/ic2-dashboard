const Basejob = require('../Basejob');
const {treis} = require('../../configuration/feeds-config');
const moment = require('moment');

const job = new Basejob(treis);

module.exports.interval = 15000;

let x = 0;

module.exports.promise = (fulfill, reject) => {
	
	let status = 500;

	if (x < 4) {
		status = 500;
	} else if (x < 8) {
		status = 200;
	} else if (x < 12) {
		status = 404;
	} else {
		x = 0;
	}
	/** 
	if (x % 2 === 0) {
		status = 500;
	} else if (x % 3 === 0) {
		status = 404;
	}
	*/

	fulfill({
		treis: {
			status: status,
			time: moment().format('llll')
		}
	});

	x++;
	
}
