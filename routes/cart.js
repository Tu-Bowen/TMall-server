var express = require('express');
var router = express.Router();
const Cart = require('../model/cart');
router.post('/cartlist',function(req,res,next){
    const userid=req.body.userId
    Cart.getCartgoods(userid).then((cartgoods)=>{
        res.json({cartgoods})
    })
})
router.post('/addcartlist',function(req,res,next){
    const {
        userId,
        goods_id,
        goods_price,
        goods_name,
        goods_show,
        goods_introduce,
        goods_type,
    } = req.body
    Cart.addCartgoods(userId,{
        goods_id,
        goods_price,
        goods_name,
        goods_show,
        goods_introduce,
        goods_type
    }).then(()=>{
        res.json({
            message:'购物车数据添加成功',
            query:0
        })
    }).catch(error=>{
        res.json({
            message:'购物车数据添加失败',
            query:1
        })
        console.log('购物车添加失败')
        console.log(error)
    })
})
module.exports=router