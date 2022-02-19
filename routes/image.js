var express = require('express');
var router = express.Router();
const User= require('../model/user');
const {uploadFile}  =require('../middleware/image');
router.post('/userimage',uploadFile,(req,res)=>{
    const {imagename} =req
    const {userid} = req.body
    console.log(userid)
    console.log(imagename)
    const url = 'http://localhost:3000/images/infoimages/'+imagename
    User.updateUserimage(userid,url).then(()=>{
        res.json({
            message:"头像修改失败",
            cannot:true
        })
    }).catch(error=>{
        res.json({
            message:"头像修改成功",
            cannot:false
        })
    })
})
router.get('/a',(req,res)=>{
    res.send("你自己看")
    res.end()
})
module.exports = router;