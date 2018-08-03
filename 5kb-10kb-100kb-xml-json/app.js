// Copyright 2017, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';
var _5kbpayload = require('./5kb.json');
var _10kbpayload = require('./10kb.json');
var _100kbpayload = require('./100kb.json');
const APPLICATION_JSON = 'application/json';
const APPLICATION_XML = 'application/xml'

var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-dat
const express = require('express');
const app = express();
var customers = new Map();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/5kb', (req, res) => {
  var accept = req.get('Accept');
  res.set('Content-Type', APPLICATION_JSON);
  res.status(200).send(getPayload('5kb', accept));

});

app.get('/10kb', (req, res) => {
  var accept = req.get('Accept');
  res.set('Content-Type', APPLICATION_JSON);
  res.status(200).send(getPayload('10kb', accept));
});

app.get('/100kb', (req, res) => {
  var accept = req.get('Accept');
  res.set('Content-Type', APPLICATION_JSON);
  res.status(200).send(getPayload('100kb', accept));
});

app.post('/customers', function (req, res, next) {
  console.log(req.body);
  customers.set(req.body.id, req.body);
  res.json(req.body);
});

app.get('/customers/:id', function (req, res) {
  res.set('Content-Type', APPLICATION_JSON);
  if(customers.has(req.params.id)){
    res.send(customers.get(req.params.id));
  } else {
    res.status(404).send('{ "message": "That record does not exist."}');
  }
})


if (module === require.main) {
  const server = app.listen(process.env.PORT || 9000  , () => {
  const port = server.address().port;
  console.log(`App listening on port ${port}`);
  });
}

module.exports = app;

function getPayload(requestType, acceptHeader){
  var payload;
  switch(requestType){
    case '5kb':
      payload =  _5kbpayload;
      break;
    case '10kb':
      payload =  _10kbpayload;
      break;
    case '100kb':
      payload = _100kbpayload;
      break;
  }
    return payload;
    //return formatPayload(payload, acceptHeader);
}

function formatPayload(payload, acceptHeader){
  if(acceptHeader === APPLICATION_XML){
    return convertToXML(payload);
  } else {
    return payload;
  }
}

function convertToXML(body){
  console.log('converting the body');
  var temp = jsontoxml(body);
  console.log(temp);
  return temp;
}

/*
function convertToXML(body){
  var body = {};
  body['root'] = {'elements': payload };
  return json2xml(body, { header: true });
}*/
