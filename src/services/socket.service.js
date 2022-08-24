import { io } from "socket.io-client";
import { socketUrl } from "../util/constant";
let socket = io.connect(socketUrl, { transports: ["websocket"] });
const initSocket = () => {
  socket = socket.on("connect", () => {
    console.log("socket conect successfully");
  });
};
export { socket, initSocket };
