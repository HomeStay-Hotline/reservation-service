// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/reservations', { useNewUrlParser: true, useUnifiedTopology: true });

// const listingSchema = mongoose.Schema({
//   listing_ID: { type: Number, unique: true },
//   name: String,
//   maxGuests: Number,
//   minDays: Number,
//   rate: Number,
//   cleaningFee: Number,
//   serviceFee: Number,
//   dates: [{ firstDate: Date, lastDate: Date }],
// });

// const reservationsSchema = mongoose.Schema({
//   listing_ID: Number,
//   check_in: String,
//   check_out: String,
//   adults: Number,
//   children: Number,
//   infants: Number,
// });

// const Listing = mongoose.model('Listing', listingSchema);
// const Reservation = mongoose.model('Reservation', reservationsSchema);

// module.exports = {
//   mongoose,
//   Listing,
//   Reservation,
// };

const { Pool } = require('pg');

const pool = new Pool({
  user: 'stevennguyen',
  database: 'reservations',
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(1);
});

pool.connect((err, client, done) => {
  if (err) throw err;
});

module.exports = { pool };
