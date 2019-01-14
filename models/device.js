const mongoose = require('mongoose');

const DeviceSchema = (collection) => {
  return new mongoose.Schema({
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
    status: {
      'type': Boolean,
      'required': true,
      'default': true,
    },
    items: [
      {
        line: String,
        name: String,
        phone: String,
      },
    ],
  }, {
    collection: collection,
  });
};

module.exports = DeviceSchema;
