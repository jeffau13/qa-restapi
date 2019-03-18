'use strict';

const express = require('express');
const app = express();
const routes = require('./routes.js');
const jsonParser = require('body-parser').json;
const logger = require('morgan');

const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(jsonParser());

app.use("/questions", routes);

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
