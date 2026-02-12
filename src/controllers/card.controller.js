const cardService = require('../services/card.service');
const asyncHandler = require('../utils/asyncHandler');

const createCard = asyncHandler(async (req, res) => {

  const card = await cardService.createCard({
    boardId: req.params.boardId,
    title: req.body.title,
    description: req.body.description,
    userId: req.user.id   // performer
  });

  res.status(201).json(card);
});

const getCards = asyncHandler(async (req, res) => {

  const cards = await cardService.getCards(req.params.boardId);
  res.status(200).json(cards);
});

const updateCard = asyncHandler(async (req, res) => {

  const updatedCard = await cardService.updateCard({
    boardId: req.params.boardId,
    cardId: req.params.cardId,
    data: req.body,
    userId: req.user.id   // performer for activity log
  });

  res.status(200).json(updatedCard);
});

const deleteCard = asyncHandler(async (req, res) => {

  await cardService.deleteCard({
    boardId: req.params.boardId,
    cardId: req.params.cardId,
    userId: req.user.id   // performer
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
