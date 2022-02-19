var express = require('express');
var router = express.Router();
const User = require('../model/user');
const Session = require('../model/session');
const getSession = (userid)=>{
    return new Promise((resolve,reject)=>{
        User.querySession(userid).then(sessiontable=>{
            if(!sessiontable)resolve([])
            const the_session_table = sessiontable.sessions;
            Session.queryAllsession(the_session_table).then(session=>{
                resolve(session)
            }).catch(error=>{
                console.log('获取用户会话列表失败')
                console.log(error)
            })
        }).catch(error=>{
            console.log('获取用户会话表名失败')
            console.log(error)
            reject(error)
        })
    })
}
router.get('/sessionlists', function (req, res, next) {
    let {userid} = req.query;
    getSession(userid).then(message=>{
        res.json({
            cannot:false,
            session:message,
            message:'获取会话列表成功'
        })
    }).catch(error=>{
        console.log('获取用户会话列表失败')
        console.log(error)
        res.json({
          cannot:true,
          message:"获取会话列表失败"  
        })
    })
});
module.exports = router;