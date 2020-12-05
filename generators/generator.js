const fs = require('fs');
const faker = require('faker');
const { argv } = require('yargs');

const lines = argv.lines || 1000000;
const filename = argv.output || 'posts.cv';
const writeStream = fs.createWriteStream(filename);
const stream = fs.createWriteStream(filename);

const minStay = faker.random.number({ min: 1, max: 14 });

const createListing = () => {
  const name = faker.address.city();
  const maxGuests = faker.random.number({ min: 1, max: 16 });
  const minDays = minStay;
  const rate = faker.random.number({ min: 30, max: 300 });
  const cleaningFee = faker.random.number({ min: 50, max: 60 });
  const serviceFee = Math.floor(rate * 0.142);

  return `${name},${maxGuests},${minDays},${rate},${cleaningFee},${serviceFee}\n`;
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

stream.write('name,maxGuests,minDays,rate,cleaningFee,serviceFee\n', 'utf-8');
startWriting(stream, 'utf-8', () => {
  stream.end();
});
