const mongoose = require('mongoose');

const DeviceSchema = (collection) => {
  return new mongoose.Schema({
    key: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    vendor: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    mac: {
      type: String,
      required: true,
    },
    timezone: {
      type: String,
      required: true,
    },
    ntp_server: {
      type: String,
      required: false,
    },
    status: {
      'type': Boolean,
      'required': true,
      'default': true,
    },
    accounts: [],
    profiles: [],
  }, {
    collection: collection,
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  });
};

module.exports = DeviceSchema;
