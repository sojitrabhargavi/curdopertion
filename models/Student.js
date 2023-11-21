const mongoose = require('mongoose');

const multer = require('multer');

const imagePath = "/uploads";

const path = require('path');

const studentSchema = mongoose.Schema({
      name : {
         type : String,
         required : true
      },
      age : {
        type : Number,
        required :true
      },
      gender :{
        type:String,
        required: true
      },
      hobby :{
        type : Array,
        required:true
      },
      city :{
        type: String,
        required: true
      },
      message :{
        type : String,
        required : true
      },
      adminImage :{
        type : String,
        required : true
      }
})

const storage = multer.diskStorage({
     destination : function(req,file ,cb){
          cb(null,path.join(__dirname,"..",imagePath))
     },
     filename : function(req,file,cb){
      cb(null,file.fieldname+"-"+Date.now())
     }
})

studentSchema.statics.imageModalPath = imagePath;

studentSchema.statics.uploadedimges = multer({storage:storage}).single("adminImage")

const student = mongoose.model('student',studentSchema)

module.exports = student;