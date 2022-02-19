module.exports= class Activity extends require('./index'){
    static getActivity(){
        return new Promise((resolve,reject)=>{
            let sql='SELECT activityname,activityimg,activeurl FROM activity';
            this.query(sql).then(results=>{
                resolve(results);
            }).catch(err=>{
                console.log(`获取活动数据失败：${err.message}`);
                reject(err);
            })
        })
    }
}