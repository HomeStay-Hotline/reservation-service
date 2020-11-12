const express = require('express');
const morgan = require('morgan');
const parser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(parser.json());

app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.listen(port, () => {
  console.log(`Server running on http:localhost:${port}`);
});
