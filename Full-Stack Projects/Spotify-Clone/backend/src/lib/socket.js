import {Server} from "socket.io";
import { Message } from "../models/messgae.model.js";

export const initializeSocket =  (server) => {
	const io = new Server(server, {
		cors: {
			origin: "http://localhost:3000",
			credentials: true,
		},
	});

        const userSockets = new Map();  // {userId : socketId}
        const userActivities = new Map(); // {userId : activity}

        io.on("connection", (socket) => {

            socket.on("user_connected", (userId)=>{
                userSockets.set(userId, socket.id);  // just became online
                userActivities.set(userId, "Idle"); // not listening anything

                // broadcast to all connected sockets that a user has just logged in
                io.emit("user_connected", userId);

                socket.emit("users_online", Array.from(userSockets.keys()));  // users online list for other users

                io.emit("activities", Array.from(userActivities.entries())); // what they are listening to
            });

            socket.on("update_activity", ({userId, activity})=>{
                console.log("update_activity", userId, activity);
                userActivities.set(userId, activity);
                io.emit("activity", {userId, activity});
            });


            socket.on("send_message", async (data) => {
                try {
                    const { senderId, receiverId, content } = data;
    
                    const message = await Message.create({
                        senderId,
                        receiverId,
                        content,
                    });
    
                    // send to receiver in realtime, if they're online
                    const receiverSocketId = userSockets.get(receiverId);
                    if (receiverSocketId) {
                        io.to(receiverSocketId).emit("receive_message", message);
                    }

                    // send to sender in realtime
                    socket.emit("message_sent", message);
                } catch (error) {
                    console.error("Message error:", error);
                    socket.emit("message_error", error.message);
                }
            });


            // when user disconnects
            socket.on("disconnect", () => {
                let disconnectedUserId;
                for (const [userId, socketId] of userSockets.entries()) {
                    // find disconnected user
                    if (socketId === socket.id) {
                        disconnectedUserId = userId;
                        userSockets.delete(userId);
                        userActivities.delete(userId);
                        break;
                    }
                }
                if (disconnectedUserId) {  // if we find disconnected user
                    io.emit("user_disconnected", disconnectedUserId);
                }
            });
        });
}