const GoodsImages = require('./goodsimages');
module.exports=class AllGoods extends require('./index') {
    /**
     * 获取商品列表
     * @param {*} params 
     * @returns 
     */
    static getGoods = (params) => {
        const { goods_module } = params
        return new Promise((resolve, reject) => {
            const sql = `SELECT  
        goods_id,
        goods_name,
        goods_price,
        goods_introduce,
        goods_show,
        goods_module,
        goods_type
        FROM allgoods `+
        (goods_module?`WHERE goods_module = '${goods_module}'`:``)
            this.query(sql, [goods_module]).then(results => {
                resolve(results)
            }).catch(error => {
                reject(error)
            })
        })
    }
    /**
     * 获取热门商品
     * @returns 
     */
    static getHotgoods() {
        return new Promise((resolve, reject) => {
            let sql = `
                SELECT 
                goods_id,
                goods_name,
                goods_price,
                goods_introduce,
                goods_show
                FROM allgoods
                WHERE hot = 'hot'
                `;
            this.query(sql).then(results => {
                resolve(results);
            }).catch(err => {
                console.log(`获取所有热门商品数据失败：${err.message}`);
                reject(err);
            })
        })
    }
    /**
     * 获取商品详情
     * @param {*} goods_id 
     */
    static getGoodsdetail=(goods_id)=>{
        return new Promise((resolve,reject)=>{
            let sql =`
            SELECT 
            goods_id,
            goods_name,
            goods_price,
            goods_introduce,
            goods_images 
            FROM allgoods 
            WHERE goods_id=?
            `
            this.query(sql,[goods_id]).then(async results=>{
                if(!results[0]){
                    resolve({})}
                const res =  {...results[0]}
                const goods_images = await GoodsImages.getGoodsImages(results[0].goods_images)
                res.goods_images= goods_images
                resolve(res)
            }).catch(error=>{
                reject(error)
            })
        })
    }
    static getTypegoods =(goods_type)=>{
        return new Promise((resolve, reject) => {
            let sql = `
                SELECT 
                goods_id,
                goods_name,
                goods_price,
                goods_introduce,
                goods_show
                FROM allgoods
                WHERE goods_type = ?
                `;
            this.query(sql,[goods_type]).then(results => {
                resolve(results);
            }).catch(err => {
                console.log(`获取所有类型商品数据失败：${err.message}`);
                reject(err);
            })
        })   
    }
}
