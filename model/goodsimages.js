module.exports=class GoodsImages extends require('./index') {
    static getGoodsImages=(tablename)=>{
        const sql=`
        SELECT url,type,big FROM ${tablename}`
        return new Promise((resolve,reject)=>{
            this.query(sql).then(results=>{
                resolve(results)
            }).catch(error=>{
                reject(error)
            })
        })
    }
}