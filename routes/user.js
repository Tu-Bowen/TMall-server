var express = require('express');
var router = express.Router();
var crypto = require('../untils/crypto')
const jwt = require('jsonwebtoken');
const User = require('../model/user');

/**登录 */
router.post('/login', function (req, res, next) {
    const { user } = req.body;
    const { pass } = req.body;
    const md5pass = crypto.md5(pass)
    User.queryUser(user).then(results => {
        // console.log(md5pass)
        // console.log(results[0])
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
                token: jwt.sign({ username: user, userId: results[0].userid }, 'tbw1376490336', {
                    // 过期时间
                    expiresIn: "3000s"
                }),
                user,
                code: 200,
                type: 1,
                message: "登录成功",
                userId: results[0].userid,
                userimage:results[0].image,
                phonenumber:results[0].phonenumber
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
/**退出登录 */
router.post('/logout', function (req, res, next) { })
/**持久化登录*/
router.post('/validate', function (req, res, next) {
    console.log(req.headers.authorization)
    let token = req.headers.authorization
    jwt.verify(token, 'tbw1376490336', function (err, decode) {
        if (err) {
            console.log("用户未登录")
            res.json({ state: 0, msg: "用户未登录" })
        } else {
            console.log("用户已登陆")
            res.json({ state: 1, msg: "用户已登陆", userinfo: { username: decode.username } })
        }
    })
})
/**注册 */
router.post('/register', function (req, res, next) {
    const { user, pass } = req.body;
    const md5pass = crypto.md5(pass)
    User.insertUser(user, md5pass).then(() => {
        res.json({
            message:"用户注册成功",
            type:0
        })
    }).catch(error=>{
        if(error){
            console.log(error)
            res.json({
                message:"用户注册失败",
                type:1
            })
        }
    });
})
/**获取用户信息 */
router.get('/userinfo',function(req,res,next){
    const {userid} = req.query
    User.queryUserinfo(userid).then(userinfo=>{
        if(!userinfo[0]){
            res.json({
                cannot:true,
                message:"获取用户详情失败"
            })
        }
        res.json({cannot:false,info:userinfo[0]})
    }).catch(error=>{
        console.log('获取用户数据失败')
        console.log(error)
        res.json({
            cannot:true,
            message:"获取用户详情失败"
        })
    })
})
/**编辑用户信息 */
router.post('/editinfo',function(req,res,next){
    const {name,phonenumber,userid} = req.body;
    User.updateUserinfo(userid,{name,phonenumber}).then(()=>{
        res.json({
            message:"用户信息更新成功",
            cannot:false
        })
    }).catch(error=>{
        console.log(`更新用户信息失败`)
        console.log(error)
        res.json({
            message:'更行用户信息失败',
            cannot:true
        })
    })
})
module.exports = router;
