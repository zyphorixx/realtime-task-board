const express = require('express');
const router = express.Router();

const authenticate = require('../middlewares/auth.middleware');
const hasRole = require('../middlewares/hasRole.middleware');
const validateObjectId = require('../middlewares/validateObjectId');

const { getBoardActivity } = require('../controllers/activity.controller');

router.get(
  '/:boardId/activity',
  authenticate,
  validateObjectId('boardId'),
  hasRole(['OWNER','EDITOR','VIEWER']),
  getBoardActivity
);

module.exports = router;