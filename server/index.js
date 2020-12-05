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

  const text = 'SELECT * FROM listings WHERE id = $1';
  const values = [id];
  db.client.query(text, values, (err, response) => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    } else {
      let obj = response.rows[0];
      const text2 = 'SELECT * FROM dates WHERE listing_id = $1';
      db.client.query(text2, values, (err2, response2) => {
        if (err2) {
          console.log(err2);
          res.sendStatus(400);
        } else {
          obj.dates = response2.rows;
          res.send(obj);
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on EC2 instance on port ${port}`);
});
