import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import userRoute from "./routes/user.routes.js";
import { initializeSocket } from "./socket/index.js";
import type { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from "./socket/socket-types.js";

const PORT = 4000;
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use("/", userRoute);

const server = http.createServer(app);

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});
initializeSocket(io);

// listen on `server`, not `app`
server.listen(PORT, () => {
  console.log(`server is running at localhost:${PORT}`);
});