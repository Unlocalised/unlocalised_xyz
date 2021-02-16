const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');

const router = express.Router();

// Login users - find user by email and password
router.post('/api/admin/login', async (req, res) =>{
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password);

        if(!user){
          res.status(401).send();
        }

        const token = await user.generateAuthToken(); // Used on the instance of the user, not the collection 'User'
        res.send({user, token}); // Return the user and the token
    }
    catch(e){
        res.status(400).send();
    }
});

// Logout users
router.post('/api/admin/logout', auth,  async (req, res) =>{
    try{
        // Already authenticated (from middleware) so we have access to req.user.token
        req.user.tokens = req.user.tokens.filter((token) =>{
            return token.token !== req.token;
        });
        await req.user.save();
        res.send();
    }
    catch(e){
        res.status(500).send(e);
    }
});

// Logout user from all accounts
router.post('api/users/logoutAll', auth,  async (req, res) =>{
    try{
        // Already authenticated (from middleware) so we have access to req.user.token
        req.user.tokens = [];
        await req.user.save();
        res.send();
    }
    catch(e){
        res.status(500).send(e);
    }
});



module.exports = router;
