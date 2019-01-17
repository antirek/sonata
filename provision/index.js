const config = require('config');
const mongoose = require('mongoose');



const createApp = require('./app').createApp;

const deviceSchema = require('./../models/device');
const Device = mongoose.model(
    'Device', deviceSchema('device')
);

mongoose.connect(config.mongodb, {useNewUrlParser: true});
let app = createApp(Device);

console.log('config', config);
app.listen(config.provision.port);