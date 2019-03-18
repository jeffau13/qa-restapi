'use strict';

const express = require('express');
const app = express();
const jsonParser = require('body-parser').json;

const port = process.env.PORT || 3000;

app.use(jsonParser());

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
