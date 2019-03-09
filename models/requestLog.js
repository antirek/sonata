const mongoose = require('mongoose');

const RequestLogSchema = (collection) => {
  return new mongoose.Schema({
    token: {
      type: String,
      required: true,
    },
    deviceId: {
      type: String,
      required: false,
    },
    request: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
      required: true,
    },
    data: {
      type: String,
      required: false,
    },
  }, {
    collection: collection,
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  });
};

module.exports = RequestLogSchema;
