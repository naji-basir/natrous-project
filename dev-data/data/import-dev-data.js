// server.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');

const Tour = require('../../models/tourModel');

// Load environment variables
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE_LOCAL; // Local MongoDB connection

// Connect to MongoDB
mongoose
  .connect(DB)
  .then(() => console.log('✅ MongoDB connected successfully!'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // Exit app if DB connection fails
  });

//READ JSON FILE
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
);

//IMPORT DATA
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data Successfully Loaded!');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

//DELETE ALL DATA FROM COLLECTIONS
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data Successfully Deleted!');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

console.log(process.argv);

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
} else {
  console.log('Use --import or --delete');
  process.exit();
}
