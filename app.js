var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors');
var socket=require('./socket/socket')
var adminviewRouter=require('./routes/admin/view')
var adminuserRouter=require('./routes/admin/user')
var adminsessionRouter=require('./routes/admin/session')


var goodsRouter=require('./routes/goods')
var userRouter = require('./routes/user')
var homeRouter=require('./routes/home')
var cartRouter=require('./routes/cart')
var orderRouter=require('./routes/order')
var messageRouter=require('./routes/message')
var sessionRouter=require('./routes/session')
var imageRouter=require('./routes/image')

var app = express();
socket(app)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())

app.use(express.static(__dirname+"/public"))

app.use('/admin/view',adminviewRouter)
app.use('/admin/user',adminuserRouter)
app.use('/admin/session',adminsessionRouter)
app.use('/admin/view',express.static(__dirname+'/admin'))


app.use('/goods', goodsRouter)
app.use('/user',userRouter)
app.use('/home',homeRouter)
app.use('/cart',cartRouter)
app.use('/order',orderRouter)
app.use('/message',messageRouter)
app.use('/session',sessionRouter)
app.use('/image',imageRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
