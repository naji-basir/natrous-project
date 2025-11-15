// server.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

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

// const testTour = new Tour({ name: 'The Salsal', price: 20000 });
// testTour
//   .save()
//   .then((doc) => console.log(doc))
//   .catch((err) => console.log('Error💥: ', err));

// Start server

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 App running on port ${port}...`);
});
