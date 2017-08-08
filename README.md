# fullcontact-card-reader
[![Build Status](https://travis-ci.org/joonhocho/fullcontact-card-reader.svg?branch=master)](https://travis-ci.org/joonhocho/fullcontact-card-reader)
[![Coverage Status](https://coveralls.io/repos/github/joonhocho/fullcontact-card-reader/badge.svg?branch=master)](https://coveralls.io/github/joonhocho/fullcontact-card-reader?branch=master)
[![npm version](https://badge.fury.io/js/fullcontact-card-reader.svg)](https://badge.fury.io/js/fullcontact-card-reader)
[![Dependency Status](https://david-dm.org/joonhocho/fullcontact-card-reader.svg)](https://david-dm.org/joonhocho/fullcontact-card-reader)
[![License](http://img.shields.io/:license-mit-blue.svg)](http://doge.mit-license.org)


FullContact Card Reader API Wrapper for Node.js


### Install
```
npm install --save fullcontact-card-reader
```

Requires `Promise`. Use [es6-promise](https://github.com/stefanpenner/es6-promise) if your Node.js version doesn't implement `Promise`.


### Usage
```javascript
import fullcontact from 'fullcontact-card-reader';

// ...later in your code
const result = await fullcontact.uploadCard({
  // [REQUIRED] default = null
  apiKey: '_YOUR_API_KEY_',

  // [REQUIRED] default = null
  webhookUrl: '_YOUR_WEBHOOK_URL_',

  // [REQUIRED] default = null
  front: '_YOUR_IMAGE_',

  // [OPTIONAL] https://www.fullcontact.com/developer/docs/card-reader/#upload-card
  back,
  verified,
  returnedData,
  format,
  casing,
  sandbox,
  URID,
  customParams,
  callback,
});


const result = await fullcontact.viewRequest({
  // [REQUIRED] default = null
  apiKey: '_YOUR_API_KEY_',

  // [REQUIRED] default = null
  id: '_YOUR_REQUEST_ID_',

  // [OPTIONAL] https://www.fullcontact.com/developer/docs/card-reader/#view-single-request
  returnedData,
  format,
  diagnostics,
  callback,
});


const result = await fullcontact.viewRequests({
  // [REQUIRED] default = null
  apiKey: '_YOUR_API_KEY_',

  // [OPTIONAL] https://www.fullcontact.com/developer/docs/card-reader/#view-requests
  page,
  returnedData,
  format,
  diagnostics,
  callback,
});

```

### Dependencies

https://github.com/form-data/form-data

https://github.com/request/request


### License

[MIT License](https://github.com/joonhocho/fullcontact-card-reader/blob/master/LICENSE)
