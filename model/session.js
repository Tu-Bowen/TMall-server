module.exports= class Session extends require('./index'){
    static queryMessagetable(sessiontable,with_username,sessiontype){
        return new Promise((resolve,reject)=>{
            let sql=`SELECT messages  FROM ${sessiontable} WHERE with_username='${with_username}' AND sessiontype='${sessiontype}'`;
            this.query(sql).then(message=>{
                resolve(message[0]);
            }).catch(error=>{
                console.log(`获取消息列表失败`);
                reject(error);
            })
        })
    }
    static queryAllsession(sessiontable){
        return new Promise((resolve,reject)=>{
            let sql=`SELECT *  FROM ${sessiontable}`;
            this.query(sql).then(message=>{
                resolve(message);
            }).catch(error=>{
                console.log(`获取消息列表失败`);
                reject(error);
            })
        })
    }

}