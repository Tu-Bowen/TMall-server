const User = require('./user');
module.exports = class Cart extends require('./index') {
    /**
     * 获取订单列表
     * @param {*} carttable 
     * @returns 
     */
    static getOrderlists(ordertable) {
        return new Promise((resolve, reject) => {
            let sql = `SELECT 
            goods_id,
            goods_name,
            goods_price,
            goods_introduce,
            goods_show,
            goods_type,
            goods_number,
            goods_status,
            goods_address
            FROM ${ordertable}`
            this.query(sql).then(results => {
                resolve(results)
            }).catch(err => {
                console.log(`获取所有订单数据失败：${err.message}`);
                reject(err);
            })
        })
    }
    /**
     * 查询用户的订单
     * @param {*} params 
     * @returns 
     */
    static getOrdergoods(userid){
        return new Promise((resolve,reject)=>{
            User.queryOrder(userid).then(ordertable=>{
                if(!ordertable)resolve([])
                const the_order_table = ordertable.orders;
                this.getOrderlists(the_order_table).then(ordergoods=>{
                    resolve(ordergoods)
                }).catch(error=>{
                    console.log('获取用户订单物品失败')
                    console.log(error)
                    reject(error)
                })
            }).catch(error=>{
                console.log('获取用户订单表名失败')
                console.log(error)
            })
        })
    }
    /**
     * 向购物车列表添加
     * @param {*} goods 
     * @param {*} carttable 
     * @returns 
     */
    static addOrderlists(goods,carttable) {
        return new Promise(async (resolve, reject) => {
            const sql = `INSERT INTO ${carttable} (
                goods_id,
                goods_name,
                goods_price,
                goods_introduce,
                goods_show,
                goods_type,
                goods_number,
                goods_status,
                goods_address
            ) VALUES (?,?,?,?,?,?,?,?,?)`;
            this.query(sql,[
                goods.goods_id,
                goods.goods_name,
                goods.goods_price,
                goods.goods_introduce,
                goods.goods_show,
                goods.goods_type,
                goods.goods_number,
                goods.goods_status,
                goods.goods_address

            ]).then(()=>{
                console.log('订单商品添加成功')
                resolve()
            }).catch(error=>{
                console.log('订单商品添加失败')
                reject(error)
            })
        })
    }
    /**
     * 添加用户的订单列表
     * @param {*} userid 
     * @param {*} goods 
     * @returns 
     */
    static addOrdergoods(userid,goods){
        return new Promise((resolve,reject)=>{
            User.queryOrder(userid).then(ordertable=>{
                if(!ordertable)reject('订单添加失败')
                const the_order_table = ordertable.oeders;
                this.addOrderlists(goods,the_order_table).then(()=>{
                    resolve()
                }).catch(error=>{
                    console.log('订单添加失败')
                    reject(error)
                })
            }).catch(error=>{
                console.log('获取用户订单表名失败')
                console.log(error)
            })
        })
    }
}