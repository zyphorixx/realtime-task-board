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
  } 
  catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Board ke cards list
async function getCards(req, res) {
  try {
    const cards = await cardService.getCards(req.params.boardId);
    res.status(200).json(cards);
  } 
  catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function updateCard(req, res){
  try {
    const updatedCard = await cardService.updateCard(
      req.params.boardId,
      req.params.cardId,
      req.body
    )

    return res.status(201).json(updatedCard);
  } 
  catch (error) {
    return res.status(404).json({message : error.message});
  }
}

async function deleteCard(req, res){
  try {
    await cardService.deleteCard(
      req.params.cardId,
      req.params.boardId
    )

    return res.status(201).json('Successfully deleted the card');
  } 
  catch (error) {
    return res.status(404).json({message : error.message});
  }
}

module.exports = {
  createCard,
  getCards,
  updateCard,
  deleteCard
};
