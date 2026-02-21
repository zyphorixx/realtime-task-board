const cardService = require('../services/card.service');
const asyncHandler = require('../utils/asyncHandler');

const createCard = asyncHandler(async (req, res) => {

  const card = await cardService.createCard({
    boardId: req.params.boardId,
    title: req.body.title,
    description: req.body.description,
    userId: req.user.id
  });

  const io = req.app.get("io");
  io.to(req.params.boardId).emit("card:created", card);

  res.status(201).json(card);
});

const getCards = asyncHandler(async (req, res) => {

  const { boardId } = req.params;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const cards = await cardService.getCards(boardId, page, limit);

  res.status(200).json(cards);
});

const updateCard = asyncHandler(async (req, res) => {

  const updatedCard = await cardService.updateCard(
    req.params.boardId,
    req.params.cardId,
    req.body,
    req.user.id
  );

  const io = req.app.get("io");
  io.to(req.params.boardId).emit("card:updated", updatedCard);

  res.status(200).json(updatedCard);
});

const deleteCard = asyncHandler(async (req, res) => {

  await cardService.deleteCard({
    boardId: req.params.boardId,
    cardId: req.params.cardId,
    userId: req.user.id
  });

  const io = req.app.get("io");
  io.to(req.params.boardId).emit("card:deleted", {
    cardId : req.params.cardId
  });

  res.status(200).json({
    message: 'Card deleted successfully'
  });
});

const getCard = asyncHandler(async (req, res) => {

  const card = await cardService.getCardById(req.params.cardId);

  if (!card) {
    return res.status(404).json({ message: "Card not found" });
  }

  res.status(200).json(card);
});

module.exports = {
  createCard,
  getCards,
  updateCard,
  deleteCard,
  getCard
};
