const config = require('config');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

const bodyParser = require('body-parser');
const openapi = require('express-openapi');
const path = require('path');

app.use(bodyParser.json());
app.use(cors());

const deviceSchema = require('./../models/device');
const Device = mongoose.model(
    'Device', deviceSchema('device')
);

mongoose.connect(config.mongodb, {useNewUrlParser: true});

openapi.initialize({
  apiDoc: require('./api-doc.js'),
  app: app,
  docsPath: '/api',
  paths: path.resolve(__dirname, 'api-routes'),
  dependencies: {
    Device,
  },
});

app.get('/', (req, res) => {
  res.send('manage');
});

console.log('config', config);
app.listen(config.manage.port);
