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

export default monthsWithDates;
