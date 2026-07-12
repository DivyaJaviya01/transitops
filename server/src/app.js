const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('TransitOps Server');
});

module.exports = app;
