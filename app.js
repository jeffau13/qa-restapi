'use strict';

const express = require('express');
const app = express();
const routes = require('./routes.js');
const jsonParser = require('body-parser').json;

const logger = require('morgan');

const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(jsonParser());

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/qa', {
    useNewUrlParser: true
});

const db = mongoose.connection;
db.on('error', error => {
    console.error(`connection error:`, error);
});

db.once('open', () => {
  console.log('db connection successful');

});
app.use("/questions", routes);

//catch 404 error and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});

//Error Handler
app.use((err,req,res,next)=>{
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  })
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
