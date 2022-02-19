module.exports= class Message extends require('./index'){
    static getMessage(messagetable,userid,sender_name){
        return new Promise((resolve,reject)=>{
            let sql=`SELECT TEXT,TYPE,sendername,STATUS,TIME ,senderid,sender_type  FROM ${messagetable}`;
            this.query(sql,[userid,sender_name]).then(results=>{
                resolve(results);
            }).catch(error=>{
                console.log(`获取消息失败`);
                reject(error);
            })
        })
    }
    static insertMessage(messagetable,message){
        return new Promise((resolve,reject)=>{
            let sql = `INSERT INTO ${messagetable} 
            (TEXT,TYPE,sendername,senderid,STATUS,sender_type,TIME) 
            VALUES (?,?,?,?,?,?,NOW())`
            this.query(sql,[message.text,message.type,message.sendername,message.senderid,message.status,message.sender_type]).then(()=>{
                resolve()
            }).catch(error=>{
                console.log('消息存储失败')
                reject(error)
            })
        })
    }
}