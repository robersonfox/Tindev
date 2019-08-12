const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const conUsers = {};

io.on('connection', sock => {
    const {user} = sock.handshake.query;
    conUsers[user] = sock.id;
})

mongoose.connect('mongodb+srv://robersonfox:<senha>@cluster0-u1hbs.mongodb.net/omnistack8?retryWrites=true&w=majority',
{useNewUrlParser: true});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = conUsers;

    return next();
})

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);
