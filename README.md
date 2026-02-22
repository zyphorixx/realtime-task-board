# TaskBoard API

A production-ready backend for a collaborative task management system with authentication, boards, cards, roles, activity tracking, caching, and realtime updates.

Built with **Node.js + Express + MongoDB + Redis + Socket.IO + Docker**

---

## Features

- JWT Authentication
- Role-based access control (Owner / Editor / Viewer)
- Boards & Cards CRUD
- Activity logging system
- Redis caching
- Socket.IO realtime events
- Rate limiting
- Request validation
- Dockerized environment
- Test-ready architecture

---

## Tech Stack

- Node.js
- Express
- MongoDB + Mongoose
- Redis
- Socket.IO
- Docker + Docker Compose

---

## Project Structure

```code
src/
 ├── config/
 ├── controllers/
 ├── middlewares/
 ├── models/
 ├── public/
 ├── routes/
 ├── services/
 ├── sockets/
 ├── utils/
 ├── validators/
 ├── app.js
 └── index.js
```

Architecture pattern used:

> Controller → Service → Model

---

## Environment Variables

Create `.env` file:

```code
PORT=3000
MONGO_URI=mongodb://mongo:27017/taskboard
REDIS_URL=redis://redis:6379
JWT_SECRET=yourSecret
JWT_EXPIRES_IN=1d
```

---

## Running Locally (Without Docker)

```code
npm install
npm run dev
```

Requires local MongoDB + Redis running.

---

## Running With Docker (Recommended)

Start everything:

```code
docker compose up --build
```

Services started:

| Service | Port |
|--------|------|
API | 3000 |
MongoDB | 27017 |
Redis | 6379 |

Stop:

```code
docker compose down
```

---

## API Endpoints

### Auth

```code
POST /auth/register
POST /auth/login
```

---

### Boards

```code
POST   /boards
GET    /boards
GET    /boards/:boardId
PATCH  /boards/:boardId
DELETE /boards/:boardId
```

---

### Members

```code
POST   /boards/:boardId/members
PATCH  /boards/:boardId/members/:userId
DELETE /boards/:boardId/members/:userId
```

---

### Cards

```code
POST   /boards/:boardId/cards
GET    /boards/:boardId/cards
GET    /boards/:boardId/cards/:cardId
PATCH  /boards/:boardId/cards/:cardId
DELETE /boards/:boardId/cards/:cardId
```

---

### Activity Log

```code
GET /boards/:boardId/activity
```

Optional filters:

```code
?performedBy=userId
?page=1
?limit=20
```

---

## Roles & Permissions

| Role | Permissions |
|-----|-------------|
OWNER | full access |
EDITOR | modify cards |
VIEWER | read only |

RBAC middleware enforces permissions automatically.

---

## Caching Strategy

Redis caches:

```code
user boards
board cards
```

Cache invalidated automatically on mutations.

---

## Realtime Events

Socket.IO events emitted:

```code
board:created
board:updated
board:deleted
card:created
card:updated
card:deleted
member:added
```

---

## Testing

Run tests:

```code
npm test
```

Test environment uses mocked Redis automatically.

---

## Production Notes

Use `npm start` in production (not dev mode).

Docker already runs production server.

---

## Health Check

```code
GET /health
```

Returns:

```code
{ "status": "OK", "app": "TaskBoard" }
```

---

## Author

Raj Singh

---
