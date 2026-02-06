const cardService = require('../services/card.service');

// Card create API
async function createCard(req, res) {
  try {
    const card = await cardService.createCard({
      boardId: req.params.boardId,
      title: req.body.title,
      description: req.body.description,
      userId: req.user.id // JWT se
    });

    res.status(201).json(card);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Board ke cards list
async function getCards(req, res) {
  try {
    const cards = await cardService.getCards(req.params.boardId);
    res.status(200).json(cards);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = {
  createCard,
  getCards
};
