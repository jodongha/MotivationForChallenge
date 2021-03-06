var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');


var indexRouter = require('./src/routes/indexRouter');
var signRouter = require('./src/routes/signRouter');
var challengeRouter = require('./src/routes/challengeRouter');
var proofRouter = require('./src/routes/proofRouter');
var boardRouter = require('./src/routes/boardRouter');
// var usersRouter = require('./routes/users');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret:'keyboard cat',
  resave:false,
  saveUninitialized:true,
}))
app.use('/challenge/', express.static('uploads'));
app.use('/challenge/:challenge_uid/board/:post_uid', express.static('uploads'));
app.use('/challenge/:challenge_uid/', express.static('uploads'));
app.use('/', express.static('uploads'));
app.use('/list/:challenge_type', express.static('uploads'));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/', challengeRouter);
app.use('/', signRouter);
app.use('/challenge', proofRouter);
app.use('/challenge', boardRouter);

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
