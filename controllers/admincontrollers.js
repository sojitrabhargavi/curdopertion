const student = require('../models/Student')

const path=require('path');

const fs = require('fs')

module.exports.student_details = async(req,res)=>{
    return res.render('student_details')
}

module.exports.addstudentdetails = async(req,res)=>{
    var imagesPath = '';
    if(req.file){
        imagesPath = student.imageModalPath+"/"+req.file.filename;
    }
    req.body.adminImage = imagesPath;
    await student.create(req.body)
    return res.redirect('back')
}

module.exports.viewdata = async(req,res)=>{
    let data = await student.find({})
    console.log(data)
    return res.render('view_details',{
         stdata:data
    })
}

module.exports.deletrecord = async(req,res)=>{
    let oldData = await student.findById(req.params.id);
if(oldData.adminImage){
    let fullpath = path.join(__dirname,"..",oldData.adminImage)
    console.log(fullpath)
    await fs.unlinkSync(fullpath)
}
       await student.findByIdAndDelete(req.params.id)
       return res.redirect('back')
}

module.exports.updatestudent = async(req,res)=>{
    record = await student.findById(req.params.id)
    console.log(record)
    return res.render('upadate',{
        oldst:record
    })
}

module.exports.upstudentdetails = async(req,res)=>{
    
    if(req.file){

        //process delect image folder
        let oldimg = await student.findById(req.body.Editid)
        if(oldimg.adminImage){
            let fullpath = path.join(__dirname,"..",oldimg.adminImage)
            await fs.unlinkSync(fullpath)
        }
        //set the new image for database
        var imagesPath = '';
       imagesPath = student.imageModalPath+"/"+req.file.filename;

       req.body.adminImage = imagesPath

       //edit record new image
       await student.findByIdAndUpdate(req.body.Editid,req.body)
       return res.redirect('/viewdata')
        
    }
    else{

      // data update without images
        let oldData = await student.findById(req.body.Editid)
        req.body.adminImage=oldData.adminImage
         await student.findByIdAndUpdate(req.body.Editid,req.body)
         return res.redirect('/viewdata')
    }
}