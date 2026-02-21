const Activity = require('../models/activity');

async function getBoardActivity(boardId, page = 1, limit = 20, performedBy) {

  page = Math.max(Number(page) || 1, 1);
  limit = Math.min(Math.max(Number(limit) || 20, 1), 50);

  const skip = (page - 1) * limit;

  const filter = { boardId };

  if (performedBy)
    filter.performedBy = performedBy;

  return Activity.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
}

module.exports = { getBoardActivity };