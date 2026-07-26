# Ink and Think API

Base URL: `http://localhost:3000`. JSON is used for REST requests and responses.

## Authentication

### `POST /auth/register`

Creates an account and returns a one-day JWT.

Request body:

```json
{ "email": "user@example.com", "username": "username", "password": "secure-password" }
```

`username` must be 3–24 letters, numbers, or underscores. `password` must be 8–72 characters. A successful response is `201 Created`:

```json
{
  "user": { "id": "cl...", "email": "user@example.com", "username": "username" },
  "token": "<jwt>"
}
```

Returns `409` when the email or username is already in use, or `400` for invalid input.

### `POST /auth/login`

Request body:

```json
{ "email": "user@example.com", "password": "secure-password" }
```

Returns `200 OK` with the same `user` and `token` response shape as registration. Returns `401` for invalid credentials and `400` for invalid input.

### `GET /auth/me`

Requires `Authorization: Bearer <jwt>`. Returns `200 OK`:

```json
{ "user": { "id": "cl...", "email": "user@example.com", "username": "username" } }
```

Returns `401` for missing, invalid, or expired tokens.

### `GET /users/me`

An alias for `GET /auth/me`; it also requires `Authorization: Bearer <jwt>` and returns the authenticated user's public profile.

## Health

### `GET /health`

Returns `200 OK` with `{ "status": "ok" }`.

## Error responses

Validation errors return `400` with `{ "message": "Invalid request data", "issues": ... }`. Other expected errors return `{ "message": "..." }` with the relevant HTTP status. Unexpected errors return `500`.

## Socket.IO game API

Connect to the base URL using Socket.IO with the JWT from registration or login:

```ts
io('http://localhost:3000', { auth: { token } });
```

Every client event takes an acknowledgement callback with either `{ ok: true }` or `{ ok: false, message: string }`.

| Client event | Payload | Purpose |
| --- | --- | --- |
| `room:create` | `{ maxPlayers?: number }` (2–12; default 8) | Creates a room and joins it. |
| `room:join` | `{ code: string }` | Joins an existing six-character room code. |
| `room:leave` | none | Leaves the current room. |
| `game:start` | none | Starts a game; only the room host may call it. At least two players are needed. |
| `chat:send` | `{ text: string }` (1–200 chars) | Sends a chat message or submits a word guess. |

| Server event | Payload | Purpose |
| --- | --- | --- |
| `room:created`, `room:joined`, `room:updated` | `{ room }` | Delivers the current public room state. |
| `player:joined` | `{ player }` | Announces a player joining. |
| `player:left` | `{ userId }` | Announces a player leaving. |
| `game:started`, `game:round-started` | `{ room }` | Announces a game or round start. |
| `game:word` | `{ word }` | Sent only to the current drawer. |
| `game:round-ended` | `{ word }` | Reveals the round word. |
| `game:ended` | `{ scores }` | Returns final players and scores. |
| `chat:message` | `{ id, userId, username, text, sentAt, correct }` | Broadcasts a chat message. Correct guesses are hidden and marked `correct: true`. |

The `room` object has `code`, `hostUserId`, `maxPlayers`, `players`, and `game`. Each player exposes `userId`, `username`, and `score`; socket IDs and the active word are never exposed. `game` is either `null` or contains `status`, `round`, `totalRounds`, `drawerUserId`, and `endsAt` (Unix milliseconds).
