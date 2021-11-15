const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username cannot be empty'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email cannot be empty'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'Enter valid email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password cannot be empty'],
        minlength: 6
    }
});

userSchema.methods.createJWT = function (){
    return jwt.sign({userId:this._id, username:this.username}, process.env.JWT_KEY, {expiresIn: process.env.JWT_TIME});
}
userSchema.methods.comparePassword = async function(inPassword){
    const valid = await bcrypt.compare(inPassword,this.password);
    return valid;
}
module.exports = mongoose.model('users', userSchema);