var express = require('express');
var router = express.Router();
const Activity = require('../model/activity')
const Banner = require('../model/banner')
//获取轮播图
router.get('/banner', function (req, res, next) {
    Banner.getBannner().then(function (results) {
        res.setHeader('Content-Type', 'application/json')
        res.status(200)
        res.json({ data: { banner: results, usein: "轮播图" } })
    });
});
//获取活动图片
router.get('/activity', function (req, res, next) {
    Activity.getActivity().then(function (results) {
        res.setHeader('Content-Type', 'application/json')
        res.status(200)
        res.json({ data: { activities: results, usein: "活动板块" } })
    });
});
module.exports = router;