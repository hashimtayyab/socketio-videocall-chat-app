const io = require('socket.io')(8900, {
   //You need to add configurations here to use it in client side
   cors:{
    origin: 'http://localhost:3000',
   },
});

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
    users.push({userId, socketId});
    // console.log(users);
}

let videoUsers = [];
const addVideoUser = (userId, socketId) => {
    !videoUsers.some((user) => user.userId === userId) &&
    videoUsers.push({userId, socketId});
    // console.log(videoUsers);
}

const removeVidUser = (socketId) => {
    videoUsers = videoUsers.filter((user) => user.socketId !== socketId);
}



const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
}

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
}

io.on("connection", (socket) => {
    console.log("User Connected");
    // console.log(users);

    //Connecting new user
    socket.on("addUser", (userId) => {
        if(userId!==null){
        addUser(userId, socket.id);
        io.emit("getUsers", users);
        }
    })

    //Receiving and Sending Message
    socket.on("sendMessage", ({senderId, receiverId, text}) =>{
        const user = getUser(receiverId);
        io.to(user.socketId).emit("getMessage", {
            senderId,
            text
        })
    })


    //Removing User
    socket.on("disconnect", ()=>{
        console.log("User Disconnected");
        removeUser(socket.id);
        removeVidUser(socket.id);
        io.emit("getVidUsers", videoUsers)
        io.emit("getUsers", users);
    })


                        //ADDING VIDEO CALL
    

    socket.emit("me", (socket.id));


    socket.on("addVidUser", (userId) => {
        if(userId!==null){
            // console.log(userId)
        addVideoUser(userId, socket.id);
        io.emit("getVidUsers", videoUsers);
        }
    })

    //checking online users

    socket.on("callUser", (data) => {
        io.to(data.userToCall).emit("callUser",{
        signal: data.signalData,
        from:data.from, 
        name: data.name 
        });
    })

    socket.on("answerCall", (data) => {
        io.to(data    // socket.emit('onlineUsers', );
        .to).emit("callAccepted", data.signal)
    })



})