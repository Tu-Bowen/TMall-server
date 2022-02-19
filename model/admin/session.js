module.exports=class Adminsession extends require('../index'){
    static queryadminMessage(targetuser,sessiontable,type){
        return new Promise((resolve,reject)=>{
            let sql=`SELECT messages FROM ${sessiontable} WHERE targetname = ? AND type = ?`;
            this.query(sql,[targetuser,type]).then(results=>{
                resolve(results[0]);
            }).catch(err=>{
                console.log(`获取管理员用户消息表数据失败：${err.message}`);
                reject(err);
            })
        })
    }
    static queryadminSession(sessiontable){
        return new Promise((resolve,reject)=>{
            let sql=`SELECT id,type,targetid,targetname,lastest,messages FROM ${sessiontable}`;
            this.query(sql).then(results=>{
                resolve(results);
            }).catch(err=>{
                console.log(`获取管理员用户会话列表数据失败：${err.message}`);
                reject(err);
            })
        })
    }
    // static insertadminMessage(name,pass){
    //     return new Promise((resolve,reject)=>{
    //         let sql = `INSERT INTO adminuser (NAME,pass) VALUES (?,?)`
    //         this.query(sql,[name,pass]).then(results=>{
    //             resolve(results);
    //         }).catch(error=>{
    //             console.log(`添加管理员用户数据失败：${error.message}`);
    //             reject(error)
    //         })
    //     })
    // }
}