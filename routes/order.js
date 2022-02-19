var express = require('express');
var router = express.Router();
const Order = require('../model/order.js');
router.get('/orderlist',function (req,res,next) {
    const {userid} =req.query;
    Order.getOrdergoods(userid).then((ordergoods)=>{
        console.log(ordergoods)
        res.json({ordergoods})
    })
})
router.post('/addorderlist',function(req,res,next) {

})
module.exports=router;