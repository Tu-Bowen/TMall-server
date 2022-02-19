var express = require('express');
var router = express.Router();
const goodsTool = require('../untils/goods')
const AllGoods = require('../model/allgoods')
//返回全部商品
router.get('/', function (req, res, next) {
    const page = parseInt(req.query.page)
    const size = parseInt(req.query.size)
    const sort = parseInt(req.query.sort)
    const priceGt = parseInt(req.query.priceGt)
    const priceLte = parseInt(req.query.priceLte)
    AllGoods.getGoods({}).then(function (results) {
        res.setHeader('Content-Type', 'application/json')
        let goodLists = null;
        if (sort == -1) {//降序排列
            results = results.sort(goodsTool.sortBy('goods_price', false))
        } else if (sort == 1) {//升序排列
            results = results.sort(goodsTool.sortBy('goods_price', true))
        }
        if (priceLte && priceGt) {//取价格区间
            results = goodsTool.range(results, priceGt, priceLte)
        }
        //分页
        goodLists = goodsTool.pagination(size, page, results)
        res.status(200)
        res.json({ data: { goods: goodLists, usein: "分页商品", total: results.length } })
    });
});
//返回商品的详情
router.get('/goodsdetail', function (req, res, next) {
    const productId = req.query.id
    AllGoods.getGoodsdetail(productId).then(results => {
        res.json(results)
    })
})
//返回热门商品
router.get('/Hotgoods', function (req, res, next) {
    AllGoods.getHotgoods().then(function (results) {
        res.setHeader('Content-Type', 'application/json')
        res.status(200)
        res.json({ data: { goods: results, usein: "热门商品" } })
    });
});
//返回首页其他版块商品
router.get('/Homemoudle', async function (req, res, next) {
    const smartisanR2 = await AllGoods.getGoods({ goods_module: 5 });
    const smartisanTNT = await AllGoods.getGoods({ goods_module: 1 });
    const parts = await AllGoods.getGoods({ goods_module: 2 });
    const loom = await AllGoods.getGoods({ goods_module: 3 });
    res.setHeader('Content-Type', 'application/json')
    res.status(200)
    res.json({
        usein: "其他板块的数据",
        data: [
            {
                title: "坚果R2及配件",
                picUrl: "https://resource.smartisan.com/resource/7035aa1c033a12a5aab738af28f8765b.png?x-oss-process=image/resize,w_600/format,webp",
                goods: smartisanR2,
                type: 1
            },
            {
                title: "Smartisan TNT",
                picUrl: "https://resource.smartisan.com/resource/89c892136594f91195035d4dbce58e38.png?x-oss-process=image/resize,w_600/format,webp",
                goods: smartisanTNT,
                type: 2
            },
            {
                title: "官方精选配件",
                picUrl: "https://resource.smartisan.com/resource/a131ef7263eac473506689cce2092848.png?x-oss-process=image/resize,w_600/format,webp",
                goods: parts,
                type: 3
            },
            {
                title: "足迹系列保护套",
                picUrl: "https://resource.smartisan.com/resource/cea53da75604832d335d1dd1edb064cd.png?x-oss-process=image/resize,w_600/format,webp",
                goods: loom,
                type: 4
            }]
    })
})
//返回某个类型的商品
router.get('/typegoods',function(req,res,next){
    const page = parseInt(req.query.page)
    const size = parseInt(req.query.size)
    const sort = parseInt(req.query.sort)
    const priceGt = parseInt(req.query.priceGt)
    const priceLte = parseInt(req.query.priceLte)
    const goods_type = req.query.goods_type
    let type;
    switch(goods_type){
        case 'mobile' :
            type = '手机'
            break;
        case 'parts' :
            type="配件"
            break;
        case 'lipro' :
            type="Lipro"
            break;
        case 'voice' :
            type="声学"
            break;

    }
    //console.log(type)
    AllGoods.getTypegoods(type).then(function (results) {
        res.setHeader('Content-Type', 'application/json')
        let goodLists = null;
        if (sort == -1) {//降序排列
            results = results.sort(goodsTool.sortBy('goods_price', false))
        } else if (sort == 1) {//升序排列
            results = results.sort(goodsTool.sortBy('goods_price', true))
        }
        if (priceLte && priceGt) {//取价格区间
            results = goodsTool.range(results, priceGt, priceLte)
        }
        //分页
        goodLists = goodsTool.pagination(size, page, results)
        res.status(200)
        res.json({ data: { goods: goodLists, usein: "分页商品", total: results.length } })
    })
})
module.exports = router;