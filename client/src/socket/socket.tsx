import { io } from "socket.io-client";

console.log("frontend socket connected!")
const socket = io(import.meta.env.VITE_BASE_URL);

export default socket;