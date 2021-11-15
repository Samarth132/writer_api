const chapterSchema = require('../db/chapterSchema');

const allChapters = async (req,res)=>{
    const chList = await chapterSchema.find({});
    res.status(200).json(chList);
}
const createChapter = (req,res)=>{
    let newChapter = new chapterSchema();
    newChapter.title = req.body.title;
    newChapter.content = req.body.content;
    newChapter.save((err,result)=>{
        if(err){
            res.send('an error has occured');
        }
        else{
            res.json(result);
        }
    });
}
const oneChapter = (req,res)=>{
    chapterSchema.findOne({
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
const updateChapter = (req,res)=>{
    chapterSchema.findOneAndUpdate({
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
const deleteChapter = (req,res)=>{
    chapterSchema.findOneAndDelete({
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
    allChapters,
    createChapter,
    oneChapter,
    updateChapter,
    deleteChapter
}