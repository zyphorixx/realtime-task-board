const Card = require('../models/card');
const Activity = require('../models/activity');
const getPagination = require('../utils/pagination');
const redis = require('../config/redis');

async function clearBoardCache(boardId){
  const keys = await redis.keys(`board:${boardId}:cards:*`);
  if(keys.length) await redis.del(...keys);
}

async function createCard({ boardId, title, description, userId }) {
  console.log("CREATE CARD INPUT:", boardId, userId);
  const card = await Card.create({
    boardId,
    title,
    description,
    createdBy:userId
  });

  await clearBoardCache(boardId);

  await Activity.create({
    boardId,
    action:'CARD_CREATED',
    performedBy:userId,
    meta:{ title }
  });

  global.io.to(boardId).emit("card:created", card);

  return card;
}

async function getCards(boardId, page = 1, limit = 10) {
  page = Number(page) || 1;
  limit = Number(limit) || 10;

  const key = `board:${boardId}:cards:${page}:${limit}`;

  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);

  const { skip } = getPagination(page, limit);

  const cards = await Card.find({ boardId })
    .limit(limit)
    .skip(skip)
    .sort({ position: 1 });

  await redis.set(key, JSON.stringify(cards), "EX", 60);

  return cards;
}

async function getCardById(cardId){
  return Card.findById(cardId);
}

async function updateCard(boardId,cardId,data,userId){

  const card = await Card.findOneAndUpdate(
    { _id:cardId, boardId },
    { $set:data },
    { new:true }
  );

  if(!card) throw new Error("Card not found");

  await clearBoardCache(boardId);

  await Activity.create({
    boardId,
    action:"CARD_UPDATED",
    performedBy:userId,
    meta:{ updatedFields:Object.keys(data) }
  });

  global.io.to(boardId).emit("card:updated", card);

  return card;
}

async function deleteCard({ boardId, cardId, userId }) {

  const card = await Card.findOneAndDelete({
    _id: cardId,
    boardId
  });

  if (!card) throw new Error("Card not found");

  await clearBoardCache(boardId);

  await Activity.create({
    boardId,
    action: "CARD_DELETED",
    performedBy: userId,
    meta: { title: card.title }
  });

  global.io.to(boardId).emit("card:deleted", { cardId, boardId });

  return card;
}

module.exports = {
  createCard,
  getCards,
  updateCard,
  deleteCard,
  getCardById
};