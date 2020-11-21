const express = require('express');
const morgan = require('morgan');
const parser = require('body-parser');
const path = require('path');
const db = require('../db/index');

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(parser.json());

app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.get('/api/homes/:id/calendar', (req, res) => {
  const { id } = req.params;

  db.Listing.find({ listing_ID: id }, (err, results) => {
    if (err) {
      console.log('Failed to fetch info from the database: ', err);
      res.sendStatus(500);
    } else {
      res.send(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on EC2 instance on port ${port}`);
});
