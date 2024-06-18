// Schema для объявлений
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
  meta: {
    createdAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  tags: {
    type: [String],
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

advertisementSchema.pre('save', updateTimestamps); // мидделвар для сохранения | обновления этих метаданных
module.exports = model('Advertisement', advertisementSchema);
