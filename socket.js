import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  const rooms = {};
  io = new Server(server, {
    cors: {
    origin: [
      "http://localhost:3000",
      "http://192.168.1.5:3000",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

   socket.on("chat-message", ({ roomId, sender, message, time }) => {
  socket.to(roomId).emit("chat-message", {
    sender: sender === "You" ? "Friend" : sender,
    message,
    time,
  });
});

   socket.on("join-room", (roomId) => {
  if (!roomId) return;

  socket.join(roomId);

  if (!rooms[roomId]) rooms[roomId] = [];

  rooms[roomId].push(socket.id);

  console.log(`User ${socket.id} joined ${roomId}`);

  io.to(roomId).emit("room-users", rooms[roomId]);

  socket.to(roomId).emit("user-joined", socket.id);
});

    // Offer
    socket.on("offer", ({ roomId, offer }) => {
  console.log("Offer");

  socket.to(roomId).emit("offer", offer);
});
socket.on("reject-call", (roomId) => {
  socket.to(roomId).emit("call-rejected");
});

    // Answer
   socket.on("answer", ({ roomId, answer }) => {
  console.log("Answer");

  socket.to(roomId).emit("answer", answer);
});

    // ICE Candidate
    socket.on("ice-candidate", ({ roomId, candidate }) => {
      if (!roomId) {
        console.log("ICE candidate received without roomId");
        return;
      }

      console.log("ICE candidate received in room:", roomId);

      socket.to(roomId).emit("ice-candidate", candidate);
    });

   socket.on("disconnect", () => {
  console.log("Disconnected:", socket.id);

  for (const roomId in rooms) {
    rooms[roomId] = rooms[roomId].filter(
      (id) => id !== socket.id
    );

    io.to(roomId).emit("room-users", rooms[roomId]);

    socket.to(roomId).emit("user-left", socket.id);

    if (rooms[roomId].length === 0) {
      delete rooms[roomId];
    }
  }
});
  });

  return io;
};

export const getIO = () => io;
