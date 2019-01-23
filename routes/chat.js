const Router = require('express').Router();
const Chat = require('./../database/models/Chat');
const Messages = require('../database/models/Messages');

Router.get("/", async (req, res) =>{

    try {
        if(!req.query.users){
            return res.status(200).send(await Chat.find().populate(['messages', 'users']));
        }
        const users = req.query.users.split(',');
        const chatByUsers = await Chat.findOne({users: {$all: users}}).populate(['users', 'messages']);
        if (!chatByUsers)
            return res.status(404).send({error: "Chat not found by users"});
        res.status(200).send(chatByUsers);
    }catch(err){
        res.status(400).send({error : "Error in find chat by user", erro: err}, );
    }

});


Router.post('/', async(req, res) =>{

    try{
        const newChat = await Chat.create(req.body);
        res.status(201).send(newChat);
    }catch(err){
        res.status(400).send({error: "Error in create chat"});
    }

});

Router.post("/:id/users", async(req, res) =>{

    try{

        let chat = await Chat.findById(req.params.id);
        if(!chat)
            return res.status(404).send({error: "This chat not found"});
        if(!chat.users.includes(req.body.user))
            chat.users.push(req.body.user);
        chat = await chat.save();
        res.status(201).send(chat);

    }catch(err){
        res.status(400).send({error: "Erro in add new user in chat"});
    }

});

Router.post("/:id/messages", async(req, res) =>{

    let chat = await Chat.findById(req.params.id);
    if(!chat)
        return res.status(404).send({error: "This chat not found"});
    const { id } = req.body;
    if(!chat.messages.includes(id))
        chat.messages.push(id);
    chat = await chat.save();
    res.status(201).send(chat);
});

module.exports = Router;