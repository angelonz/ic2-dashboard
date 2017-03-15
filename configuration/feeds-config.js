const config = {

	treis: {
		url: 'https://infoconnect1.highwayinfo.govt.nz/ic/jbi/TREIS/REST/FeedService/',
		interval: 120000,
		name: 'treis'
	},
	tmp: {
		url: 'https://infoconnect1.highwayinfo.govt.nz/ic/jbi/TMP/REST/FeedService/',
		interval: 120000,
		name: 'tmp'
	},
	ssdf: {
		url: 'https://infoconnect1.highwayinfo.govt.nz/ic/jbi/SsdfJourney2/REST/FeedService/journeys',
		interval: 120000,
		name: 'ssdf'
	},
	cameras: {
		url: 'https://infoconnect1.highwayinfo.govt.nz/ic/jbi/TrafficCameras2/REST/FeedService/',
		interval: 120000,
		name: 'cameras'
	},
	congestion: {
		url: 'https://infoconnect1.highwayinfo.govt.nz/ic/jbi/TrafficConditions2/REST/FeedService/',
		interval: 120000,
		name: 'congestion'
	},
	signs: {
		url: 'https://infoconnect1.highwayinfo.govt.nz/ic/jbi/VariableMessageSigns2/REST/FeedService/',
		interval: 120000,
		name: 'signs'
	},
	ic2Header: {
		username: 'AngeloAIC2',
		password: 'Fujitsu123'
	}
};

module.exports = config;