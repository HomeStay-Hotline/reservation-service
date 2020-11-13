const faker = require('faker');
const db = require('./index.js');

// Adds a given number of days to a given date and returns a new Date with those days added
function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// Returns an array of all dates (in ISO format) between a given start and end date
var getDaysArray = function(start, end) {
  let arr = [];
  const date = new Date(start);
  for (date; date <= end; date.setDate(date.getDate() + 1)) {
    arr.push(new Date(date));
  }
  return arr;
};

// Returns an array of all dates (in 'YYYY-MM-DD' format) between today and 364 days from now
const makeDates = () => {
  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = addDays(firstDay, 365);
  var daylist = getDaysArray(firstDay, lastDay);
  return daylist.map((date) => date.toISOString().slice(0,10)).join(" ");
};

// Returns an array of calendar objects containing the date ('YYYY-MM-DD' format) and its availability
// Sets availability as false if that day within the current month has already passed
const makeAvailability = () => {
  let datesToAdd = [];
  const dates = makeDates().split(' ');
  const dateOfTheMonth = new Date(Date.now()).getDate();
  for (let i = 0; i < dateOfTheMonth - 1; i++) {
    datesToAdd.push({
      date: dates[i],
      available: false
    });
  }
  for (let i = dateOfTheMonth - 1; i < dates.length - 1; i++) {
    datesToAdd.push({
      date: dates[i],
      available: true
    });
  }
  return datesToAdd;
}

// Creates all listings to enter into the database
const createListings = () => {
  let listings = [];
  const datesToAdd = makeAvailability();
  for (let i = 0; i < 100; i++) {
    const rate = faker.random.number({min: 30, max: 300});
    const serviceFee = Math.floor(rate * 0.142);  
    listings.push({
      listing_ID: i + 1,
      name: faker.address.city(),
      maxGuests: faker.random.number({min: 1, max: 16}),
      minDays: faker.random.number({min: 1, max: 14}),
      rate: rate,
      cleaningFee: faker.random.number({min: 50, max: 60}),
      serviceFee: serviceFee,
      dates: datesToAdd
    });
  }
  return listings;
};

const allListings = createListings();

// Depopulates any data currently in the Listings table and then populates the Listing table with 100 entries.
const populate = () => {
  db.Listing.deleteMany({}, (err) => {
    if (err) {
      console.log(err);
    } else {
      db.Listing.insertMany(allListings, (err) => {
        if (err) {
          console.log('Failed to create new record to the database', err);
        }
        db.mongoose.connection.close();
      });
    }
  });
}

populate();
