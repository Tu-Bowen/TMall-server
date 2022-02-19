module.exports=class Adminuser extends require('../index'){
    static queryadminUser(user){
        return new Promise((resolve,reject)=>{
            let sql='SELECT pass,name,id FROM adminuser WHERE name = ? ';
            this.query(sql,[user]).then(results=>{
                resolve(results);
            }).catch(err=>{
                console.log(`获取管理员用户数据失败：${err.message}`);
                reject(err);
            })
        })
    }
    static insertadminUser(name,pass){
        return new Promise((resolve,reject)=>{
            let sql = `INSERT INTO adminuser (NAME,pass) VALUES (?,?)`
            this.query(sql,[name,pass]).then(results=>{
                resolve(results);
            }).catch(error=>{
                console.log(`添加管理员用户数据失败：${error.message}`);
                reject(error)
            })
        })
    }
    static queryadminSession(user){
        return new Promise((resolve,reject)=>{
            let sql='SELECT sessions FROM adminuser WHERE name = ? ';
            this.query(sql,[user]).then(results=>{
                resolve(results[0]);
            }).catch(err=>{
                console.log(`获取管理员用户数据失败：${err.message}`);
                reject(err);
            })
        })
    }
}