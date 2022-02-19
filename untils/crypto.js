const crypto = require("crypto"); //引入自己下载好的crypto模块
module.exports = { //把加密的功能封装成一个对象并且输出出去(即暴露此功能模块对象)
    md5:function (pass) {
        const md5 = crypto.createHash("md5"); //设置加密模式为md5
        md5.update(pass+this.autograph); //把传入的用户密码和自定义的字符串进行编译的到加密过后的密码
        const result = md5.digest("hex"); //设置密码格式为16进制
        return result;//返回后加密过后的密码
    }
}