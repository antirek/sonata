const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const openapi = require('express-openapi');
const expressip = require('express-ip');

const getIP = (req, res, next) => {
  const xForwardedFor = (req.headers['x-forwarded-for'] || '')
      .replace(/:\d+$/, '');

  req.remote_ip = xForwardedFor || req.connection.remoteAddress;
  next();
};

const createApp = (api) => {
  const app = express();

  app.use(bodyParser.json());
  app.use(cors());

  app.use(getIP);
  app.use(expressip().getIpInfoMiddleware);


  openapi.initialize({
    apiDoc: api.apiDoc, // require('./api-doc.js'),
    app: app,
    docsPath: '/api',
    paths: api.paths, // path.resolve(__dirname, 'api-routes'),
    dependencies: api.dependencies,
  });

  app.get('/', (req, res) => {
    res.send('hello world');
  });

  return app;
};

exports.createApp = createApp;
