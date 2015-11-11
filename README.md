# geolang-express
[![Build Status](https://img.shields.io/travis/koalazak/geolang-express.svg)](https://travis-ci.org/koalazak/geolang-express)
[![npm version](https://badge.fury.io/js/geolang-express.svg)](http://badge.fury.io/js/geolang-express)
[![npm dependency status](https://david-dm.org/koalazak/geolang-express.png)](https://david-dm.org/koalazak/geolang-express)

A simple geolocation middleware for Express.js. This module expose `countryLang` and object with more data `countryData` on app.locals making data visibles in views too.
Also, set the session `cookieLangName` with the language of visitors country, useful for i18n modules.

NOTE: When using this module, we recommend also using the [i18n-express](https://github.com/koalazak/i18n-express) module, which use the `cookieLangName` session to set i18n translations according that value. 


## Requirements

  - Node >= 0.12
  - Express.js session enabled

## Instalation

```bash
$ npm install geolang-express
```

## Usage

```js
var geolang=require("geolang-express");

app.use( geolang(options) );
```

## Options

- `cookieLangName` : *(default: `ulang`)* If you provide a cookie name, try to get user lang from this session/cookie.
- `defaultCountry` :  *(default: `US`)* Default country, for example if the IP is 127.0.0.1
- `siteLangs` :  *(default: `['en']`)* Array of supported langs. (posbile values for clang and json files. see [i18n-express](https://github.com/koalazak/i18n-express))


## Example 

 In your Express app.js:

```javascript
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var i18n=require("i18n-express");
var geolang=require("geolang-express");

var indexRoutes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

app.use(geolang({
  siteLangs: ["en","es"],
  cookieLangName: 'ulang'
}));


/*
//Read documentation if you need to use i18n-express package
app.use(i18n({
  translationsPath: path.join(__dirname, 'i18n'),
  siteLangs: ["en","es"],
  cookieLangName: 'ulang'
}));
*/


app.use('/', indexRoutes);

module.exports = app;


```

Now in your ejs view you have `countryLang` and object with more data `countryData`:

```html
<div>
	
	<p>Language by Country IP set to: <%=countryLang%></p>

</div>
```

Or in your handlebars view:

```html
<div>
	
	<p>Language by Country IP set to: <%=countryLang%></p>

</div>
```

## License

MIT

## Author

  - [Facu ZAK](https://github.com/koalazak) 
