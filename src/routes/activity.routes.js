const express = require('express');
const router = express.Router();

const { getBoardActivity } = require('../controllers/activity.controller');

router.get('/boards/:boardId/activity',authenticate,hasRole(['OWNER','EDITOR','VIEWER']),getBoardActivity);

module.exports = router;
