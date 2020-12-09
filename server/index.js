const express = require('express');
const morgan = require('morgan');
const parser = require('body-parser');
const path = require('path');
const db = require('../db/index');

const app = express();
const port = 3000;
const PUB_DIR = path.resolve(__dirname, '..', 'public');

app.use(morgan('dev'));
app.use(parser.json());

app.use('/:id', express.static(PUB_DIR));

// app.get('/api/homes/:id/calendar', (req, res) => {
//   const { id } = req.params;

//   db.Listing.find({ listing_ID: id }, (err, results) => {
//     if (err) {
//       console.log('Failed to fetch info from the database: ', err);
//       res.sendStatus(500);
//     } else {
//       res.send(results);
//     }
//   });
// });

app.get('/api/homes/:id/calendar', (req, res) => {
  const { id } = req.params;

  const text = 'select * from listings inner join dates on dates.listing_id = listings.id where listings.id = $1';
  const values = [id];
  db.client.query(text, values, (err, response) => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
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
      obj.dates = [];
      for (let i = 0; i < response.rows.length; i++) {
        let temp = {};
        temp.firstdate = response.rows[i].firstdate;
        temp.lastdate = response.rows[i].lastdate;
        obj.dates.push(temp);
      }
      res.send(obj);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on EC2 instance on port ${port}`);
});
