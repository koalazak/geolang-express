var assert = require('assert');
var path = require('path');

var geolangMod = require('..');
var res={};

function getExpressReq(headers, session, query){

	var headers = headers || {};
	var session = session || {};
	var query = query || {};

	return {
		session: session,
		cookies: {},
		query: query,
		headers: headers,
		app: {locals:{}},
		connection: {}
	}
}

describe('geolang-express', function() {
  describe('middleware', function () {
    it('should set default Country and Language', function (done) {
      
      	var req=getExpressReq({'x-forwarded-for':'127.0.0.1'});
      	
      	var mws=geolangMod({
				  siteLangs: ['en','es']
				});

      	mws(req, res, function(){
      		assert.equal('US', req.app.locals.countryData.alpha2);
      		assert.equal('en', req.app.locals.countryLang);

      		done();
      	});

    });
    
    it('should set user defined default Country and Language', function (done) {
      
      	var req=getExpressReq({'x-forwarded-for':'127.0.0.1'});
      	
      	var mws=geolangMod({
				  siteLangs: ['en','es'],
				  defaultCountry: "AR"
				});

      	mws(req, res, function(){
      		assert.equal('AR', req.app.locals.countryData.alpha2);
      		assert.equal('es', req.app.locals.countryLang);

      		done();
      	});

    });
    
    it('should set Jamaica Country and Language', function (done) {
      
      	var req=getExpressReq({'x-forwarded-for':'96.43.160.3'});
      	
      	var mws=geolangMod({
				  siteLangs: ['en','es'],
				  defaultCountry: "AR"
				});
				
      	mws(req, res, function(){
      		assert.equal('JM', req.app.locals.countryData.alpha2);
      		assert.equal('en', req.app.locals.countryLang);

      		done();
      	});

    });
    
     it('should set Italy Country and Language. And store in session', function (done) {
      
      	var req=getExpressReq({'x-forwarded-for':'62.77.32.3'});
      	
      	var mws=geolangMod({
				  siteLangs: ['en','es','it'],
				  defaultCountry: "AR"
				});
				
      	mws(req, res, function(){
      		assert.equal('IT', req.app.locals.countryData.alpha2);
      		assert.equal('it', req.app.locals.countryLang);
      		assert.equal('it', req.session.ulang);

      		done();
      	});

    });

 });
});
