const activityService = require('../services/activity.service');

const getBoardActivity = asyncHandler(async (req, res) => {

    const { page = 1, limit = 20 } = req.query;

    const activity = await activityService.getBoardActivity(
      req.params.boardId,
      Number(limit),
      Number(page)
    );

    res.status(200).json(activity);
});

module.exports = { getBoardActivity };
