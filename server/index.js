const express = require('express');
const bodyParser = require("body-parser")
const cors = require("cors")
const http = require('http');
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const { counter_pick } = require('./helper');

const io = new Server(server, {
    cors: {
        origin: "*",
    }
});
app.set("io", io)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())





io.on("connection", (socket) => {

    socket["heros"] = []
    socket.on("new_hero", (data) => {
    
        socket.heros.push(data.hero.toLowerCase())

        socket.emit("res", { scors: counter_pick(socket.heros) })
    })

    socket.on("remove_single", (data) => {
        socket.heros=socket.heros.filter(hero => hero != data.hero.toLowerCase())
        socket.emit("res", { scors: counter_pick(socket.heros) })
    })
    socket.on("reset", () => {
        socket.heros = []
        socket.emit("res", { scors: [] })

    })

})



server.listen("4000", () => {
    console.log("run");
})
