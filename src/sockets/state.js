// global socket state store

const boardUsers = new Map();

/*
Structure:

Map {
   boardId => Map {
        socketId => userId
   }
}
*/

module.exports = { boardUsers };