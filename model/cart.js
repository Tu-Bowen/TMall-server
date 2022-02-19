const User = require('./user');
module.exports = class Cart extends require('./index') {
    /**
     * 获取购物车列表
     * @param {*} carttable 
     * @returns 
     */
    static getCartlists(carttable) {
        return new Promise((resolve, reject) => {
            let sql = `SELECT 
            goods_id,
            goods_name,
            goods_price,
            goods_introduce,
            goods_show,
            goods_type,
            goods_number
            FROM ${carttable}`
            this.query(sql).then(results => {
                resolve(results)
            }).catch(err => {
                console.log(`获取所有购物车数据失败：${err.message}`);
                reject(err);
            })
        })
    }
    /**
     * 查询用户的购物车
     * @param {*} params 
     * @returns 
     */
    static getCartgoods(userid){
        return new Promise((resolve,reject)=>{
            User.queryCart(userid).then(carttable=>{
                if(!carttable)resolve([])
                const the_cart_table = carttable.carts;
                this.getCartlists(the_cart_table).then(cartgoods=>{
                    resolve(cartgoods)
                }).catch(error=>{
                    console.log('获取用户购物车内物品失败')
                    console.log(error)
                })
            }).catch(error=>{
                console.log('获取用户购物车表名失败')
                console.log(error)
                reject(error)
            })
        })
    }
    /**
     * 向购物车列表添加
     * @param {*} goods 
     * @param {*} carttable 
     * @returns 
     */
    static addCartlists(goods,carttable) {
        return new Promise(async (resolve, reject) => {
            const sql = `INSERT INTO ${carttable} (
                goods_id,
                goods_name,
                goods_price,
                goods_introduce,
                goods_show,
                goods_type
            ) VALUES (?,?,?,?,?,?)
            `
            this.query(sql,[
                goods.goods_id,
                goods.goods_name,
                goods.goods_price,
                goods.goods_introduce,
                goods.goods_show,
                goods.goods_type
            ]).then(()=>{
                console.log('购物车商品添加成功')
                resolve()
            }).catch(error=>{
                console.log('购物车商品添加失败')
                reject(error)
            })
        })
    }
    /**
     * 添加用户的购物车
     * @param {*} userid 
     * @param {*} goods 
     * @returns 
     */
    static addCartgoods(userid,goods){
        return new Promise((resolve,reject)=>{
            User.queryCart(userid).then(carttable=>{
                if(!carttable)reject('购物车添加失败')
                const the_cart_table = carttable.carts;
                this.addCartlists(goods,the_cart_table).then(()=>{
                    resolve()
                }).catch(error=>{
                    console.log('购物车添加失败')
                    reject(error)
                })
            }).catch(error=>{
                console.log('获取用户购物车表名失败')
                console.log(error)
            })
        })
    }
}