var express = require('express');
var router = express.Router();
var crypto = require('../../untils/crypto');
var Adminuser = require('../../model/admin/user');
var jwt = require('jsonwebtoken');
/** 注册*/
router.post('/register',(req,res,next)=>{
    const {username,password} =req.body
    const md5pass = crypto.md5(password)
    Adminuser.insertadminUser(username,md5pass).then(()=>{
        res.json({
            message:"管理员注册成功",
            cannot:false
        })
    }).catch(error=>{
        console.log('管理员账户注册失败')
        console.log(error)
        res.json({
            message:"管理员注册失败",
            cannot:true
        })
    })
})
/**登录 */
router.post('/login', function (req, res, next) {
    const { username,password } = req.body;
    const md5pass = crypto.md5(password)
    Adminuser.queryadminUser(username).then(results => {
        if (results.length === 0) {
            console.log("用户名错误")
            //用户名错误
            res.json({
                code: 500,
                type: 0,
                message: "用户名不存在"
            })
        } else if (results.length == 1 && results[0].pass == md5pass) {
            console.log("登陆成功")
            //登录成功
            res.json({
                token: jwt.sign({ username: username, userId: results[0].id }, 'tbw1376490336', {
                    // 过期时间
                    expiresIn: "3000s"
                }),
                code: 200,
                type: 1,
                message: "登录成功",
                adminid: results[0].id,
                username
            })
        } else {
            console.log("密码错误")
            //密码错误
            res.json({
                code: 500,
                type: 2,
                message: "密码错误"
            })
        }
    })
});
/**管理员持久化验证 */
router.post('/validate',function(req,res,next){

})
module.exports=router;