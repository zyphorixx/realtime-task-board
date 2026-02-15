const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
    required: true
  },

  title: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  status: {
    type: String,
    enum: ['TODO', 'IN_PROGRESS', 'DONE'],
    default: 'TODO'
  },

  position: {
    type: Number, // ordering ke liye
    default: 0
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }

}, { timestamps: true });

// board ke cards fast fetch honge
cardSchema.index({ boardId: 1 });

// ordering fast hogi
cardSchema.index({ position: 1 });

// status filter fast hoga (future feature)
cardSchema.index({ status: 1 });

module.exports = mongoose.model('Card', cardSchema);
