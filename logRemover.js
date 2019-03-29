const cron = require('node-cron');
const config = require('config');
const moment = require('moment');
const mongoose = require('mongoose');

const requestLogSchema = require('./models/requestLog');

const logsConn = mongoose.createConnection(config.logs.mongodb, {
  useNewUrlParser: true,
});

const RequestLog = logsConn.model(
    'RequestLog', requestLogSchema('log_request')
);

const removeOldLogs = () => {
  RequestLog.remove({
    updated_at: {$lte: moment().subtract(1, 'week').toDate()},
  }).then((res) => {
    console.log('res', res);
  }).catch((err)=> {
    console.log('err:', err);
  });
};

cron.schedule(config.remove.cron, () => {
  try {
    removeOldLogs();
  } catch (err) {
    console.log(err);
  }
});
