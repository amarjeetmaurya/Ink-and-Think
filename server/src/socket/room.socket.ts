import type { TypedServer, TypedSocket } from "./socket-types.js";

export default function registerRoomEvents(io: TypedServer, socket: TypedSocket) {

    socket.on("join-room", (roomId) => {

        socket.join(roomId);

    });

}