const faker = require('faker');
const db = require('./index.js');

// Adds a given number of days to a given date and returns a new Date with those days added
const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// Returns an array of all dates (in ISO format) between a given start and end date
const getDaysArray = (start, end) => {
  const arr = [];
  const date = new Date(start);
  for (date; date <= end; date.setDate(date.getDate() + 1)) {
    arr.push(new Date(date));
  }
  return arr;
};

// Returns an array of all dates (in 'DayOfWeek, Month Day, Year' format)
// between today and 365 days from now
const makeDates = () => {
  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = addDays(firstDay, 365);
  const daylist = getDaysArray(firstDay, lastDay);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return daylist.map((dt) => dt.toLocaleDateString('us-EN', options)).join('/');
};

// Returns an array of date objects containing the date (split into day of the week, month,
// date, and year) and its availability
// Sets availability as false if that day within the current month has already passed
const makeAvailability = () => {
  const datesToAdd = [];
  const dates = makeDates().split('/');
  const currentMonth = new Date(Date.now()).getDate();
  for (let i = 0; i < currentMonth - 1; i += 1) {
    const splitDate = dates[i].split(' ');
    const dayOfWeek = splitDate[0].slice(0, -1);
    const date = splitDate[2].slice(0, -1);
    datesToAdd.push({
      dayOfWeek,
      month: splitDate[1],
      date,
      year: splitDate[3],
      available: false,
    });
  }
  for (let i = currentMonth - 1; i < dates.length - 1; i += 1) {
    const splitDate = dates[i].split(' ');
    const dayOfWeek = splitDate[0].slice(0, -1);
    const date = splitDate[2].slice(0, -1);
    datesToAdd.push({
      dayOfWeek,
      month: splitDate[1],
      date,
      year: splitDate[3],
      available: true,
    });
  }
  return datesToAdd;
};

const staticCalendar = makeAvailability();

const months = ['December', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November'];
const monthsWithDates = [];
for (let i = 0; i < months.length; i += 1) {
  monthsWithDates.push(staticCalendar.filter((dt) => dt.month === months[i]));
}

const createRandomReservations = (minimum) => {
  const months2 = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const index = Math.floor(Math.random() * 12);
  const index2 = Math.floor(Math.random() * monthsWithDates[index].length);
  const newFirst = (monthsWithDates[index][index2]);
  const randomReserve = {};
  randomReserve.firstDate = new Date(newFirst.year, months2.indexOf(newFirst.month), newFirst.date);
  const index3 = Math.floor(Math.random() * 5) + minimum;
  // this needs to be changed, 4 needs to be replaced with minimum nights of stay
  randomReserve.lastDate = new Date();
  randomReserve.lastDate.setYear(randomReserve.firstDate.getFullYear());
  randomReserve.lastDate.setMonth(randomReserve.firstDate.getMonth());
  randomReserve.lastDate.setDate(randomReserve.firstDate.getDate() + index3);
  return randomReserve;
};


// Creates all listings to enter into the database
const createListings = () => {
  const listings = [];
  for (let i = 0; i < 100; i += 1) {
    const rate = faker.random.number({ min: 30, max: 300 });
    const serviceFee = Math.floor(rate * 0.142);
    const minStay = faker.random.number({ min: 1, max: 14 });
    const reservations = [];
    for (let j = 0; j < (faker.random.number({min: 1, max: 5})); j++) {
      reservations.push(createRandomReservations(minStay));
    }
    console.log(reservations);
    listings.push({
      listing_ID: i + 1,
      name: faker.address.city(),
      maxGuests: faker.random.number({ min: 1, max: 16 }),
      minDays: minStay,
      rate,
      cleaningFee: faker.random.number({ min: 50, max: 60 }),
      serviceFee,
      dates: reservations,
    });
  }
  return listings;
};

const allListings = createListings();

// Depopulates any data currently in the Listings table and then
// populates the Listing table with 100 entries.
const populate = () => {
  db.Listing.deleteMany({}, (err) => {
    if (err) {
      console.log(err);
    } else {
      db.Listing.insertMany(allListings, (secondErr) => {
        if (err) {
          console.log('Failed to create new record to the database', secondErr);
        }
        db.mongoose.connection.close();
      });
    }
  });
};

populate();
