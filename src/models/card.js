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
    type: Number, // For ordering cards
    default: 0
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }

}, { timestamps: true });

// Index for fast board cards fetch
cardSchema.index({ boardId: 1 });

// Index for fast ordering
cardSchema.index({ position: 1 });

// Index for fast status filter (future feature)
cardSchema.index({ status: 1 });

module.exports = mongoose.model('Card', cardSchema);
