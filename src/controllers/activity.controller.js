const activityService = require('../services/activity.service');

async function getBoardActivity(req, res) {
  try {
    const { page = 1, limit = 20 } = req.query;

    const activity = await activityService.getBoardActivity(
      req.params.boardId,
      Number(limit),
      Number(page)
    );

    res.status(200).json(activity);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = { getBoardActivity };
