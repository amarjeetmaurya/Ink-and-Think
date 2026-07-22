import type { TypedServer, TypedSocket } from "./socket-types.js";

export default function registerChatEvents(io: TypedServer, socket: TypedSocket) {

    socket.on("send-message", (data) => {
        console.log(data);
        io.emit("receive-message", data);
    });

}