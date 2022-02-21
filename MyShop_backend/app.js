var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var stores=require('./routes/stores');
var category=require('./routes/category');
var shape=require('./routes/shape');
var price=require('./routes/price');
const sms=require("./routes/sms")
var admin=require('./routes/admin');
var product=require('./routes/product');
var finalproduct=require('./routes/finalproduct');
var userhome=require('./routes/userhome');
require('dotenv').config()
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/stores',stores);
app.use('/category',category);
app.use('/attribute',shape);
app.use('/price',price);
app.use('/admin',admin);
app.use('/userhome',userhome);
app.use('/products',product);
app.use('/finalproduct',finalproduct);
app.use('/sendsms',sms); 
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
  res.render('error');
});

module.exports = app;