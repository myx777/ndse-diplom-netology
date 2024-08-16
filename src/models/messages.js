// Schema сообщений
const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  meta: {
    sentAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
    readAt: {
      type: Date,
      default: null,
    },
  },
  text: {
    type: String,
    required: true,
  },
})
module.exports = messageSchema;


//Сообщение считается прочитанным, когда поле readAt не пустое.