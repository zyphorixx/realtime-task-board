const Card = require('../models/card');

// Card create
async function createCard({ boardId, title, description, userId }) {
  const card = await Card.create({
    boardId,
    title,
    description,
    createdBy: userId
  });

  return card;
}

// Board ke saare cards
async function getCards(boardId) {
  return Card.find({ boardId }).sort({ position: 1 });
}

async function getCardById(cardId){
  return Card.findById(cardId);
}

async function updateCard(boardId, cardId, data){
  const card = await Card.findOneAndUpdate(
    { _id: cardId, boardId },
    { $set: data },
    { new: true }
  );

  if(!card){
    throw new Error('Card not found');
  }

  return card;
}

async function deleteCard(boardId, cardId){
  const card = Card.findOneAndDelete({
    _id : cardId,
    boardId
  });

  if(!card){
    throw new Error('Card not found');
  }

  return card;
}

module.exports = {
  createCard,
  getCards,
  updateCard,
  deleteCard,
  getCardById
};
