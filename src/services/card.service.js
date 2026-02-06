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

module.exports = {
  createCard,
  getCards
};
