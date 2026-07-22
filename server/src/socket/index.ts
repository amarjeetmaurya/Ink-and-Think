import registerChatEvents from "./chat.socket.js";
import registerRoomEvents from "./room.socket.js";
import type { TypedServer } from "./socket-types.js";

export function initializeSocket(io: TypedServer) {
  console.log("socket trigered");
  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);
    registerChatEvents(io, socket);
    registerRoomEvents(io, socket);
  });
}
