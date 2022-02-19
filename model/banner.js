module.exports= class Banner extends require('./index'){
    static getBannner(){
        return new Promise((resolve,reject)=>{
            let sql='SELECT picUrl,picUrl2,picUrl3 FROM banner';
            this.query(sql).then(results=>{
                resolve(results);
            }).catch(err=>{
                console.log(`获取轮播图失败：${err.message}`);
                reject(err);
            })
        })
    }
}