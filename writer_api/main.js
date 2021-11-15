const express = require('express');
const jwt = require('jsonwebtoken');
const m_user = require('./db/userSchema');
const app = express();
const chapters = require('./routes/chapterRoute');
const users = require('./routes/userRoute');
const connectDB = require('./db/connect');
require('dotenv').config();
const cors = require('cors');
const userAuth = require('./middleware/authentication');

const port = 8000;
// middleware
app.use(express.json());
app.use(express.urlencoded(
    {extended: true}
));
app.use(cors({
    origin: '*'
}));

// routes
app.get('/', (req,res)=>{
    res.send('writers log');
});

app.use('/api/v1/chapters',userAuth, chapters);
app.use('/api/v1/users', users);
const checkConnection = async ()=>{
    try{
        await connectDB(process.env.WRITER_URI);
        app.listen(port, console.log(`server is active on port ${port}`));
    }
    catch(err){
        console.log(err);
    }
}
checkConnection();