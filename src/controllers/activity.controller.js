const activityService = require('../services/activity.service');
const asyncHandler = require('../utils/asyncHandler');

const getBoardActivity = asyncHandler(async (req, res) => {

    const activities = await activityService.getBoardActivity(
      req.params.boardId,
      req.query.page,
      req.query.limit,
      req.query.performedBy
    );

    res.status(200).json(activities);
});

module.exports = { getBoardActivity };
