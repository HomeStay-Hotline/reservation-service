const newrelic = require('newrelic');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const db = require('../db/index');

const app = express();
const port = 4000;
const PUB_DIR = path.resolve(__dirname, '..', 'public');

app.use('/:id', express.static(PUB_DIR));

app.get('/api/homes/:id/calendar', (req, res) => {
  const { id } = req.params;
  db.pool.query('select * from listings left join dates on dates.listing_id = listings.id where listings.id = $1', [id], (err, response) => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    } else if (response.rows[0].listing_id === null) {
      const listing = response.rows[0];
      listing.dates = [];
      res.send(listing);
    } else {
      const obj = {};
      const listing = response.rows[0];
      obj.id = listing.listing_id;
      obj.name = listing.name;
      obj.maxGuests = listing.maxguests;
      obj.minDays = listing.mindays;
      obj.rate = listing.rate;
      obj.cleaningFee = listing.cleaningfee;
      obj.serviceFee = listing.servicefee;
      obj.dates = response.rows;
      res.send(obj);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on EC2 instance on port ${port}`);
});
