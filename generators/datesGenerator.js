const fs = require('fs');
const faker = require('faker');
const { argv } = require('yargs');

const lines = argv.lines || 1000000;
const filename = argv.output || 'dates.cv';
const writeStream = fs.createWriteStream(filename);
const stream = fs.createWriteStream(filename);

const createDates = (index) => {
  const listing_id = index;
  let firstDate = faker.date.future();
  while (firstDate.getMonth() >= 10) {
    firstDate = faker.date.future();
  }
  //   const strArr = firstDate.toString().split(' ');
  //   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  //   const tempString = `${strArr[3]}-${months.indexOf(strArr[1]) + 1}-${strArr[2]}`;
  //   firstDate = new Date(tempString);
  //   console.log(firstDate);
  const range = Math.floor(Math.random() * 5) + 5;
  const lastDate = new Date();
  lastDate.setFullYear(firstDate.getFullYear());
  lastDate.setMonth(firstDate.getMonth());
  lastDate.setDate(firstDate.getDate() + range);

  return `${listing_id},${firstDate.toString()},${lastDate.toString()}\n`;
};

const startWriting = (writeStream, encoding, done) => {
  let i = lines;
  let j = 0;
  function writing() {
    let canWrite = true;
    do {
      i--;
      j++;
      for (let k = 0; k < Math.floor(Math.random() * 6); k++) {
        const reserve = createDates(j);
        if (i === 0) {
          writeStream.write(reserve, encoding, done);
        } else {
          canWrite = writeStream.write(reserve, encoding);
        }
      }
    } while (i > 0 && canWrite);
    if (i > 0 && !canWrite) {
      writeStream.once('drain', writing);
    }
  }
  writing();
};

stream.write('listing_id,firstDate,lastDate\n');
startWriting(stream, 'utf-8', () => {
  stream.end();
});
