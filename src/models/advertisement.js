// advertisementSchema.js
const { Schema, model } = require('mongoose');
const updateTimestamps = require('../middleware/updateTimestamps');

const advertisementSchema = new Schema({
  shortText: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  images: {
    type: [String],
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  tags: {
    type: [String],
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
}, {
  timestamps: true // автоматом добавит «createAt» и «updatedAt»
});

advertisementSchema.pre('save', updateTimestamps); // Middleware for updating timestamps

module.exports = model('Advertisement', advertisementSchema);
