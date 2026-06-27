import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

let socketInstance = null;

export const createSocketConnection = () => {
  if (!socketInstance) {
    socketInstance = io(BASE_URL, {
      withCredentials: true,
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
  }

  return socketInstance;
};

export const disconnectSocket = () => {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
  }
};