console.log("Lab Exercise 01")

const fs = require('fs');
const csv = require('csv-parser');

// Function to delete a file if it exists
const deleteFileIfExists = (filename) => {
  if (fs.existsSync(filename)) {
    fs.unlinkSync(filename);
    console.log(`${filename} deleted successfully`);
  }
};

// Function to filter data based on country and write to a file
const filterAndWriteToFile = (inputFile, outputFile, country) => {
  const writeStream = fs.createWriteStream(outputFile);

  fs.createReadStream(inputFile)
    .pipe(csv())
    .on('data', (row) => {
      if (row['country'] === country) {
        writeStream.write(JSON.stringify(row) + '\n');
      }
    })
    .on('end', () => {
      writeStream.end();
      console.log(`Data for ${country} filtered and written to ${outputFile}`);
    });
};

// Delete existing files if they exist
deleteFileIfExists('canada.txt');
deleteFileIfExists('usa.txt');

// Filter and write data for Canada
filterAndWriteToFile('input_countries.csv', 'canada.txt', 'Canada');

// Filter and write data for United States
filterAndWriteToFile('input_countries.csv', 'usa.txt', 'United States');
