var fs=require("fs");
var geoip = require('geoip-lite');
var countries = require('country-data').countries;
var languages = require('country-data').languages;

function getCountryCode(ip, defaultCountry){
		
	if ( ip.indexOf('::ffff:') > -1 ) {
		ip = ip.split(':').reverse()[0];
	}
	var countryCode;
	var lookedUpIP = geoip.lookup(ip)
	if ( lookedUpIP && lookedUpIP.country ) {
		countryCode = lookedUpIP.country;
	}
	if ( ( ip === '127.0.0.1' ) || ( ! lookedUpIP ) ) {
		countryCode = defaultCountry;
	}
	return countryCode
}

exports = module.exports = function (opts){

	var cookieLangName = opts.cookieLangName || "ulang";
	var defaultCountry = opts.defaultCountry || "US";
	var siteLangs = opts.siteLangs || ['en'];
	
	if(siteLangs.constructor !== Array) throw new Error('siteLangs must be an Array with supported langs.');
		
	return function geolang(req, res, next) {
	
		if('countryLangData' in req.app.locals){
			//geo data already exist. skip
		}else{
		
			var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
			var countryCode=getCountryCode(ip, defaultCountry);
			var countryData=countries[countryCode];
			var countryLang = languages[countryData.languages[0]];
			
			req.app.locals['countryData']=countryData;
			req.app.locals['countryLangData']=countryLang;
			req.app.locals['countryLang']=countryLang.alpha2;
			
		}
		
		if(cookieLangName && req.session && req.session[cookieLangName]){
			//lang is already set. skip
		}else{
			if(siteLangs.indexOf(req.app.locals['countryLang']) > -1){
			
				req.session[cookieLangName]=req.app.locals['countryLang'];
				
			}
		}
		
		//console.log(req.app.locals['countryData']);
		//console.log(req.app.locals['countryLang']);
		//console.log(req.session[cookieLangName]);
		
		next();

    };
  
};
