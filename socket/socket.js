var io = require('socket.io')();
const _ = require('underscore');
const moment = require('moment');
const Adminmessage = require('../model/admin/message');
const Adminsession = require('../model/admin/session');
const Adminuser = require('../model/admin/user');
const User = require('../model/user');
const Session = require('../model/session');
const Message = require('../model/message')

const Insertmessage = (senderid, sendername, sender_type, targetname, targettype, text, type = "text") => {
    return new Promise((resolve, reject) => {
        if (sender_type === "fellow") {
            Adminuser.queryadminSession(sendername).then(sessiontable => {
                if (sessiontable) {
                    Adminsession.queryadminMessage(targetname, sessiontable.sessions, targettype).then(messagetable => {
                        if (messagetable) {
                            Adminmessage.insertadminMessage(messagetable.messages, {
                                senderid,
                                sendername,
                                type,
                                text,
                                sender_type,
                                status: 'y'
                            }).then(() => {
                                console.log("消息记录添加成功")
                                resolve()
                            }).catch(error => {
                                console.log('消息记录添加失败')
                                console.log(error)
                                reject(error)
                            })
                        } else {
                            console.log('获取管理员用户消息表失败')
                            reject()
                        }
                    })
                } else {
                    console.log('获取管理员用户会话表失败')
                    reject
                }
            }).catch(error => {
                console.log('获取管理员用户会话表失败')
                console.log(error)
                reject(error)
            })
        } else if (sender_type === "custom") {
            User.querySession(senderid).then(sessiontable => {
                if (!sessiontable) resolve([])
                const the_session_table = sessiontable.sessions;
                Session.queryMessagetable(the_session_table,targetname,targettype).then(messagetable=>{
                    if(!messagetable)resolve([])
                    const the_message_table = messagetable.messages;
                    Message.insertMessage(the_message_table,{
                        senderid,
                        sendername,
                        type,
                        text,
                        sender_type,
                        status: 'y'
                    }).then(()=>{
                        resolve()
                    }).catch(error=>{
                        console.log("消息记录添加失败")
                        reject(error)
                    })
                })
            })
        }
    })
}

module.exports = (app) => {
    //socket.io集成在express
    app.io = io
    io.on('connection', function (socket) {
        socket.on("session", (message) => {
            const { sessions } = message
            sessions.forEach(session => {
                socket.join(session.messages)
            })
            console.log(socket.rooms)
        })
        socket.on("private_message", (message) => {
            console.log(message)
            const { sessionname, sendername, senderid, sender_type, targetname, text, targettype } = message
            //const users = io.sockets.adapter.rooms.get(sessionname).size
            console.log(sessionname)
            console.log(socket.rooms)
            io.to(sessionname).emit("return_private_message", { text: message.text, sendername, sender_type ,senderid})
            // if (users === 2) {//两人同时在线

            // } else if (users === 1) {//只有一个人在线

            // }

            Insertmessage(senderid, sendername, sender_type, targetname, targettype, text).then(() => {
                // socket.emit('setstore_message', { message: "消息存储成功", setstore: "success" })
                // io.to(sessionname).broadcast.emit("setstore_message", { message: "消息存储成功", setstore: "success" })
            }).catch((error) => {
                console.log(error)
                // socket.emit('setstore_message', { message: "消息存储失败", setstore: "fail",error })
                // io.to(sessionname).broadcast.emit("setstore_message", { message: "消息存储失败", setstore: "fail",error })
            })
        })
        socket.on('disconnect', reason => {
            console.log('disconnect: ', reason);
        });
        console.log("socket.io连接成功")
    });
}