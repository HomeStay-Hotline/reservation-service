const fs = require('fs');
const faker = require('faker');
const { argv } = require('yargs');

const lines = argv.lines || 1000000;
const filename = argv.output || 'listings.jsonl';
const writeStream = fs.createWriteStream(filename);
const stream = fs.createWriteStream(filename);

const minStay = faker.random.number({ min: 1, max: 14 });

const createListing = () => {
  const obj = {};
  obj.name = faker.address.city();
  obj.maxGuests = faker.random.number({ min: 1, max: 16 });
  obj.minDays = minStay;
  obj.rate = faker.random.number({ min: 30, max: 300 });
  obj.cleaningFee = faker.random.number({ min: 50, max: 60 });
  obj.serviceFee = Math.floor(obj.rate * 0.142);
  obj.dates = [];
  for (let i = 0; i < Math.floor(Math.random() * 6); i++) {
    let temp = {};
    let firstDate = faker.date.future();
    while (firstDate.getMonth() >= 10) {
      firstDate = faker.date.future();
    }
    const range = Math.floor(Math.random() * 5) + 5;
    const lastDate = new Date();
    lastDate.setFullYear(firstDate.getFullYear());
    lastDate.setMonth(firstDate.getMonth());
    lastDate.setDate(firstDate.getDate() + range);
    temp.firstDate = firstDate;
    temp.lastDate = lastDate;
    obj.dates.push(temp);
  }

  return `${JSON.stringify(obj)}\n`;
};

const startWriting = (writeStream, encoding, done) => {
  let i = lines;
  function writing() {
    let canWrite = true;
    do {
      i--;
      const listing = createListing();
      if (i === 0) {
        writeStream.write(listing, encoding, done);
      } else {
        canWrite = writeStream.write(listing, encoding);
      }
      // check if i === 0 so we would write and call 'done'
      // else call write and continue looping
    } while (i > 0 && canWrite);
    if (i > 0 && !canWrite) {
      writeStream.once('drain', writing);
    }
  }

  writing();
};

startWriting(stream, 'utf-8', () => {
  stream.end();
});
