var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var aboutUsRouter = require('./routes/aboutus');
var contactUsRouter = require('./routes/contactus');
var usersRouter = require('./routes/users');
var privacypolicyRouter = require('./routes/privacypolicy');
var termsofuseRouter = require('./routes/termsofuse');
var fileuploadRouter = require('./routes/api/fileupload');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/index', indexRouter);
app.use('/aboutus', aboutUsRouter);
app.use('/contactus', contactUsRouter);
app.use('/users', usersRouter);
app.use('/privacypolicy', privacypolicyRouter);
app.use('/termsofuse', termsofuseRouter);
app.use('/api', fileuploadRouter)

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
