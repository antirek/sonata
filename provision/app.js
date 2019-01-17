const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const openapi = require('express-openapi');
const path = require('path');

const createApp = (Device) => {
  const app = express();

  app.use(bodyParser.json());
  app.use(cors());

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
    res.send('hello world');
  });

  return app;
}

exports.createApp = createApp;