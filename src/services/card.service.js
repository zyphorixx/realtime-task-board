const Card = require('../models/card');
const Activity = require('../models/activity');
const getPagination = require('../utils/pagination');

// Card create
async function createCard({ boardId, title, description, userId }) {
  const card = await Card.create({
    boardId,
    title,
    description,
    createdBy: userId
  });

  await Activity.create({
    boardId,
    action : 'CARD_CREATED',
    performedBy : userId,  // who triggered
    meta : { title } // what changed
  });

  return card;
}

// Board ke saare cards
async function getCards(boardId) {

  const getPagination = require('../utils/pagination');

  return Card.find({ boardId })
  .limit(limit) // limit apply
  .skip(skip)  // skip apply
  .sort({ position: 1 }); // position ke hisab se order
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

  if(card){
    await Activity.create({
      boardId,
      action : 'CARD_UPDATED',
      performedBy : userId,
      meta : { title }
    });
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

  if(card){
    await Activity.create({
      boardId,
      action : 'CARD_DELETED',
      performedBy : userId,
      meta : { title }
    });
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
