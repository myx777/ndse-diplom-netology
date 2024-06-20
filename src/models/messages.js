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
      default: '',
    },
  },
  text: {
    type: String,
    required: true,
  },
})
module.exports = model("Messages", messageSchema);


//Сообщение считается прочитанным, когда поле readAt не пустое.