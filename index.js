const express = require('express');
const app = express();
const { port } = require('./config/config').web;

const server = require('http').Server(app);
const socket = require('socket.io')(server);

require('./database');

const ChatRouter = require('./routes/chat');
const MessagesRouter = require('./routes/messages');
const UserRouter = require('./routes/user');

const Messages = require('./database/models/Messages');
const Chat = require('./database/models/Chat');

app.use(express.json());
app.use(express.urlencoded({ extended:  true}));
app.use(require('cors')());


app.use((req, res, next) =>{
   req.socket = socket;
   next();
});

app.use('/chat', ChatRouter);
app.use('/messages', MessagesRouter);
app.use('/user', UserRouter);

socket.of('/privateMessage').on('connection', client=>{

    client.on('joinTo', data=> {
        client.join(data);
    });

    client.on('message', async data=>{
        const message = await Messages.create(data.message);
        socket.of('/privateMessage').in(data._id).emit('privateMessage', message);
        const chat = await Chat.findById(data._id);
        if(chat) {
            chat.messages.push(message._id);
            await chat.save();
        }
    });

});

server.listen(port, (error) =>{
    if(error) throw error;
    console.log(`Server started in http://localhost:${port}`);
});
