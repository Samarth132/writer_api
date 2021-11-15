const mongoose = require('mongoose');
const user = require('./userSchema');

const chapterSchema = new mongoose.Schema({
    title: String,
    content: String,
    id: mongoose.ObjectId
})

module.exports = mongoose.model('chapters', chapterSchema);