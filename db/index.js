const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/reservations', { useNewUrlParser: true, useUnifiedTopology: true });

let datesSchema = mongoose.Schema({
  date: String,
  available: Boolean
}, { _id: false });

let listingSchema = mongoose.Schema({
  listing_ID: {type: Number, unique: true},
  name: String,
  maxGuests: Number,
  minDays: Number,
  rate: Number,
  cleaningFee: Number,
  serviceFee: Number,
  dates: [datesSchema]
});

let reservationsSchema = mongoose.Schema({
  listing_ID: Number,
  check_in: String,
  check_out: String,
  adults: Number,
  children: Number,
  infants: Number,
});

let Listing = mongoose.model('Listing', listingSchema);
let Reservation = mongoose.model('Reservation', reservationsSchema);

module.exports = {
  mongoose,
  Listing,
  Reservation
};
