const Router = require('express').Router();
const Messages = require('../database/models/Messages');

Router.post("/", async (req, res) =>{

    try {
        const newMessage = await Messages.create(req.body);
        res.status(201).send(newMessage);
    }catch(err){
        res.status(400).send({error : "Error in find messages", erro: err});
    }


});

module.exports = Router;