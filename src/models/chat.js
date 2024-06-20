// Schema чата
const { Schema, model } = require('mongoose');
const messageSchema = require('./messages');

const chatSchema = new Schema({
  users: {
    type: [Schema.Types.ObjectId, Schema.Types.ObjectId],
    required: true,
  },
  meta: {
    createdAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  messages: {
    type: [messageSchema],
  },
});

module.exports = model('Chat', chatSchema);