var express = require('express');
var router = express.Router();
const Message = require('../model/message');
const Session = require('../model/session');
const User = require('../model/user');
const getMessage = (userid, with_username,sessiontype)=>{
    return new Promise((resolve, reject) => {
        User.querySession(userid).then(sessiontable => {
            if (!sessiontable) resolve([])
            const the_session_table = sessiontable.sessions;
            Session.queryMessagetable(the_session_table, with_username,sessiontype).then(messagetable => {
                if (!messagetable) resolve([])
                const the_message_table = messagetable.messages;
                Message.getMessage(the_message_table, userid, with_username).then(messagelists => {
                    resolve(messagelists)
                }).catch(error => {
                    console.log('获取用户消息记录失败')
                    console.log(error)
                })
            }).catch(error => {
                console.log('获取用户消息记录列表失败')
                console.log(error)
            })
        }).catch(error => {
            console.log('获取用户会话表名失败')
            console.log(error)
            reject(error)
        })
    })
}
router.get('/messagelists/customerservice', function (req, res, next) {
    let { userid, sender_name ,sessiontype} = req.query;
    console.log(userid, sender_name)
    getMessage(userid, sender_name,sessiontype).then(messagelists => {
        res.json({
            cannot: false,
            message: "获取消息记录成功",
            messagelists
        })
    }).catch(error => {
        console.log('获取消息记录失败')
        console.log(error)
        res.json({
            cannot: true,
            message: "获取消息记录失败"
        })
    })
});
module.exports = router;