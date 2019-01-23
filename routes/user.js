const Router = require('express').Router();
const User = require('../database/models/User');

Router.get('/', async (req, res) =>{

    try{
        res.status(200).send(await User.find());
    }catch(err){
        res.status(400).send({error: "Erro in find all users"});
    }

});




//login user
Router.post('/login', async (req, res) =>{
console.log("login");
    try{
        let user = await User.findOne({name: req.body.username});
        if(!user)
            return res.status(404).send({error: "User not found"});
        res.status(200).send(user);
    }catch(err){
        res.status(400).send({error: "Error in you login"});
        console.log(err.message);
    }

});




Router.get('/:id/friends', async (req, res) =>{

    try{
        const { id } = req.params;
        const user = await User.findById(id).select('+friends').populate(['friends']);
        if(!user) return res.status(404).send( { error: "User not found" } );
        res.send( { friends : user.friends}) ;
    }catch(err) {
        res.status(400).send({ error : "Error in find you friends"});

    }

});


Router.post('/:id/friends', async (req, res) =>{

    try{
        const { id } = req.params;
        let  friend   = req.body.friend;
        
        const user = await User.findById(id).select('+friends');
        console.log("friend",friend);
        console.log("user",user);
        if(!user) return res.status(404).send({ error: "User not found"});
       
        friend = await User.findById(friend).select('+friends');
        console.log("friend ",friend._id);
        if(!friend) return res.status(404) .send({ error: "This new friend not found"});
       
        if(!user.friends.includes(friend._id)){
            user.friends.push(friend._id);
            await user.save();
            if(!friend.friends.includes(user._id)){
                friend.friends.push(user._id);
                await friend.save();
            }
        }
        res.status(201).send(await User.findById(id).select('+friends').populate(['friends']));
    }catch(err){
        res.status(400).send({ error: "Error in add you friend"});
        console.error(err);
    }

});






//cadastrar user
/*
Router.post('/delete', async (req, res) =>{

    try{
        //const user = await User.create(req.body);
        var myquery = { _id: req.body._id };
        const user = await User.deleteOne(myquery);
        res.send("usuário deletado") ;
        }catch(err){
            res.status(400).send({ "erro ao deletar" : err.message})
        }
});
*/

Router.post('/', async (req, res) =>{

    try{
        //const user = await User.create(req.body);
        const user = await User.create(req.body);
        res.status(201).send(user);
    }catch(err){
        res.status(400).send({ "erro na api2" : err.message})
    }

});



module.exports = Router; 