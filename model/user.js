module.exports=class User extends require('./index'){
    static queryUser(user){
        return new Promise((resolve,reject)=>{
            let sql='SELECT pass,name,userid,image,phonenumber FROM user WHERE name = ? ';
            this.query(sql,[user]).then(results=>{
                resolve(results);
            }).catch(err=>{
                console.log(`获取用户数据失败：${err.message}`);
                reject(err);
            })
        })
    }
    static insertUser(name,pass){
        return new Promise((resolve,reject)=>{
            let sql = `INSERT INTO USER (NAME,pass) VALUES (?,?)`
            this.query(sql,[name,pass]).then(results=>{
                resolve(results);
            }).catch(error=>{
                console.log(`添加用户数据失败：${error.message}`);
                reject(error)
            })
        })
    }
    // static queryImage(userid){
    //     return new Promise((resolve,reject)=>{
    //         let sql = `SELECT image FROM USER WHERE userid = ?`
    //         this.query(sql,[userid]).then(image=>{
    //             resolve(image[0])
    //         }).catch(error=>{
    //             console.log(`查询用户头像失败：${error}`)
    //             reject(error)
    //         })
    //     })
    // }
    static queryCart(userid){
        return new Promise((resolve,reject)=>{
            let sql = `  SELECT carts FROM USER WHERE userid = ?`
            this.query(sql,[userid]).then(carttable=>{
                resolve(carttable[0])
            }).catch(error=>{
                console.log(`查询购物车失败：${error}`)
                reject(error)
            })
        })
    }
    static queryOrder(userid){
        return new Promise((resolve,reject)=>{
            let sql = `SELECT orders FROM USER WHERE userid = ?`
            this.query(sql,[userid]).then(ordertable=>{
                resolve(ordertable[0])
            }).catch(error=>{
                console.log(`查询订单失败：${error}`)
                reject(error)
            })
        })
    }
    static queryUserinfo(userid){
        return new Promise((resolve,reject)=>{
            let sql='SELECT name,userid,phonenumber,image FROM user WHERE userid = ? ';
            this.query(sql,[userid]).then(results=>{
                resolve(results);
            }).catch(err=>{
                console.log(`获取用户信息数据失败：${err.message}`);
                reject(err);
            })
        })
    }
    static updateUserinfo(userid,info){
        return new Promise((resolve,reject)=>{
            let sql = `UPDATE user 
            SET name = ?,phonenumber=? ${info.image?`,image=${info.image}`:``} 
            WHERE userid = ?`
            this.query(sql,[info.name,info.phonenumber,userid]).then(result=>{
                resolve(result)
            }).catch(error=>{
                console.log(`用户信息更新失败`)
                console.log(error)
                reject(error)
            })
        })
    }
    static updateUserimage(userid,url){
        return new Promise((resolve,reject)=>{
            let sql = `UPDATE user 
            SET image = ? 
            WHERE userid = ?`
            this.query(sql,[url,userid]).then(result=>{
                resolve(result)
            }).catch(error=>{
                console.log(`用户头像更新失败`)
                console.log(error)
                reject(error)
            })
        })
    }
    static querySession(userid){
        return new Promise((resolve,reject)=>{
            let sql = `SELECT sessions FROM USER WHERE userid = ?`
            this.query(sql,[userid]).then(sessiontable=>{
                resolve(sessiontable[0])
            }).catch(error=>{
                console.log(`查询会话失败：${error}`)
                reject(error)
            })
        })
    }
}
