const { log } = require('console');
const express = require('express')
const http = require('http');
const socketIo = require('socket.io');
const {Server} = require('socket.io')
const cors = require("cors");;
const app = express();
// app.use(cors())
// const server =app.listen(8080,()=>{
//     console.log("Server started on 8080");
// })
// const io = socketIo(server,{
//     cors: {
//       origin: "http://localhost:1234",
//       methods: ["GET", "POST"]
//     }
//   });

const io = new Server({
    cors: {
      origin: "http://localhost:1234",
      methods: ["GET", "POST"]
    }
  });
io.on('connection',(socket)=>{
    console.log("user connected");

    socket.on("message",(message)=>{
        io.emit("message",message);
    })

    socket.on('disconnect',()=>{
        console.log("user disconnected");
    })
})

// const PORT = 8080;

io.listen(8080, ()=>{
    console.log("Server started at 8080");
})