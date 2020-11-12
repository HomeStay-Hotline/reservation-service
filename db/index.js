const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/reservations');

let calendarSchema = mongoose.Schema({
  listing_ID: {type: Number, unique: true},
  name: String,
  maxGuests: Number,
  minDays: Number,
  rate: Number,
  cleaningFee: Number,
  serviceFee: Number,
  dates: [
    {
      date: Date,
      days_in_month: Number,
      available: Boolean
    }
  ]
});

let reservationsSchema = mongoose.Schema({
  listing_ID: Number,
  check_in: Date,
  check_out: Date,
  adults: Number,
  children: Number,
  infants: Number,
});

let Calendar = mongoose.model('Calendar', calendarSchema);
let Reservation = mongoose.model('Reservation', reservationsSchema);

module.exports = {
    Calendar,
    Reservation
};
