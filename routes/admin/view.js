var express = require('express');
var router = express.Router();
var path =require('path');
router.get('/login',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../../admin/login.html'))
})
router.get('/register',(req,res,next)=>{
    res.sendFile(path.join(__dirname,"../../admin/register.html"))
})
router.get('/index',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../../admin/index.html'))
})
module.exports=router;