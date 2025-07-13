import { io } from "socket.io-client";

// ⚠️ server URL ni backendga qarab o‘zgartiring
export const socket = io("http://localhost:7070", {
  withCredentials: true,
  autoConnect: false,
});
