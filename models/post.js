const mongoose = require('mongoose');

const multer = require('multer');

const postImage = "/uploads/post-images";

const path = require('path');

const postSchema = mongoose.Schema({
    title : {
       type : String,
       required : true
    },
    content : {
        type : String,
        required : true
     },
     postImage :{
        type : String,
        required : true
      }
})

const storage = multer.diskStorage({
    destination : function(req,file ,cb){
         cb(null,path.join(__dirname,"..",postImage))
    },
    filename : function(req,file,cb){
     cb(null,file.fieldname+"-"+Date.now())
    }
})

postSchema.statics.uploadepostdimges = multer({storage:storage}).single('postImage')

postSchema.statics.imagepostPath = postImage ;

const post = mongoose.model('post',postSchema)

module.exports = post;