const Activity = require('../models/activity');

async function getBoardActivity(boardId, limit = 20, page = 1) {
  const skip = (page - 1) * limit;

  return Activity.find({ boardId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
}

module.exports = { getBoardActivity };
