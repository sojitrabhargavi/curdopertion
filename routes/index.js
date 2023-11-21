const express = require('express');

const path=require('path');

const fs = require('fs')

const routes = express.Router()

const student = require('../models/Student')

const admincontrollers = require("../controllers/admincontrollers")

routes.get("/" , admincontrollers.student_details)

routes.post("/addstudentdetails" ,student.uploadedimges, admincontrollers.addstudentdetails)

routes.get ("/viewdata",admincontrollers.viewdata)

routes.get("/deletrecord/:id",admincontrollers.deletrecord)

routes.get("/updatestudent/:id",admincontrollers.updatestudent)

routes.post("/upstudentdetails",student.uploadedimges,admincontrollers.upstudentdetails)

module.exports = routes;