const user = require('../db/userSchema');
const bcrypt = require('bcryptjs');

const allUsers = (req,res)=>{
    user.find({})
    .exec((err,result)=>{
        if(err){
            res.send('error has occured');
        }
        else{
            res.json(result);
        }
    });
}
const createUser = async (req,res)=>{
    const {username, email, password} = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const tempUser = {username, email, password:hash}
    const newUser = await user.create({...tempUser});
    const token = newUser.createJWT();
    res
    .status(200)
    .json({
        msg : `user created ${newUser.username}`,
        key: token
    });
}
const loginUser = async (req,res)=>{
    const {email, password} = req.body;

    if(!email || !password){
        res.json({error : "Please enter email and password"});
    }

    const regUser = await user.findOne({email});
    if(!regUser){
        res.json({error : "Invalid Credentials"});
    }
    const checkPass = await regUser.comparePassword(password);
    if(!checkPass){
        res.json({error : "Invalid Credentials"});
    }

    const token = regUser.createJWT();
    res
    .status(200)
    .json({
        msg : `user logged in ${regUser.username}`,
        key: token
    });
}
const oneUser = (req,res)=>{
    user.findOne({
        _id: req.params.id
    })
    .exec((err,result)=>{
        if(err){
            res.send('an error has occured');
        }
        else{
            res.json(result);
        }
    });
}
const deleteUser = (req,res)=>{
    user.findOneAndDelete({
        _id: req.params.id
    },(err,result)=>{
        if(err){
            res.send('an error has occured');
        }
        else{
            res.send('user deleted')
            res.json(result);
        }
    });
}

module.exports = {
    allUsers,
    createUser,
    loginUser,
    oneUser,
    deleteUser
}