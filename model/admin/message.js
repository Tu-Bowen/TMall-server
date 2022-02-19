module.exports=class Adminmessage extends require('../index'){
    static queryadminMessage(messagetable){
        return new Promise((resolve,reject)=>{
            let sql=`SELECT * FROM ${messagetable}`;
            this.query(sql).then(results=>{
                resolve(results);
            }).catch(err=>{
                console.log(`获取管理员用户聊天记录数据失败：${err.message}`);
                reject(err);
            })
        })
    }
    static insertadminMessage(messagetable,message){
        return new Promise((resolve,reject)=>{
            let sql=`INSERT INTO ${messagetable} (senderid,sendername,TYPE,TEXT,sender_type,STATUS) VALUES (?,?,?,?,?,?)`;
            this.query(sql,[
                message.senderid,
                message.sendername,
                message.type,
                message.text,
                message.sender_type,
                message.status
            ]).then(results=>{
                resolve(results);
            }).catch(err=>{
                console.log(`新增聊天记录数据失败：${err.message}`);
                reject(err);
            })
        })
    }
}