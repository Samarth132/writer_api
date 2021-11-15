jwt = require('jsonwebtoken');
user = require('../db/userSchema');

const auth = async (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        res.json({err:'Unauthorized, please login first'});
    }
    const token = authHeader.split(' ')[1];
    try{
        const payload = jwt.verify(token,process.env.JWT_KEY);
        req.user = {userId:payload.userId, username:payload.username};
        next();
    }
    catch(err){
        res.json({err:'Unauthorized, please login first'});
    }
}

module.exports = auth;