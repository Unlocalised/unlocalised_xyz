const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) =>{
    try{
        // Ensure there is a token - if it fails (undefined) catch will run
        const token = req.header('Authorization').replace('Bearer ','');

        // Ensure the token is valid (created by the server and !expired)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find a user with the id from the token and that has the token in its tokens.token array
        const user = await User.findOne({_id: decoded._id, 'tokens.token' : token});

        if(!user){
            throw new Error();
        }

        // Give route handler access to the user & their token for targeted device logout
        req.user = user;
        req.token = token;

        // Ensure route handler runs
        next();

    }
    catch(e){
        res.status(401).send({"error": "Please authenticate"});
    }
}


module.exports = auth;

