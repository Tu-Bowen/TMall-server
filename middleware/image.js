const multer = require('multer')
const path = require('path')
//自定义中间件
function uploadFile(req,res,next){
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../public/images/infoimages'))
    },
    filename: function (req, file, cb) {
        const {userid,username} = req.body 
        const imagename = file.fieldname + '-' + Date.now()+ username + userid +'.jpg' 
        req.imagename = imagename
        cb(null, imagename)
    }
  })
  let upload = multer({ storage: storage }).single("file");
  /* single属性名需和上传的name一致否则报错：multererr:MulterError: */
	upload(req,res,(err)=>{
    console.log(req.file);
    console.log(req.imagename);
    /* 文件存入 */
    if (err instanceof multer.MulterError) {
        console.log(err)
      res.json({
          message:"图片上传失败",
          cannot:true,
          error:err
      });
      console.log("multer error:" + err);
      return false;
    }else if(err){
        console.log(err)
      res.send({
        message:"图片上传失败",
        cannot:true,
        error:err
      });
      return false;
    }else{
      console.log({ 'FileSuccess': req.file })
      next();
    }
	})
}
module.exports={
    uploadFile
}