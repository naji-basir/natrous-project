const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

// app.get('/', (req, res) => {
//   // res.status(200).send('Hello from the server side!');
//   res.status(200).json({ message: 'Hello from server side!', methode: 'get' });
// });
// app.post('/', (req, res) => {
//   // res.send('Send');

//   // res.status(404).json({ message: '404 from server', methode: 'post' });
//   res.status(200).json({ message: 'Hello world from server', methode: 'post' });
// });
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
// console.log(tours);

const port = 3000;

// app.get('/api/v1/tours', (req, res) => {
//   res
//     .status(200)
//     .json({ status: 'success', result: tours.length, data: { tours } });
// });

//GET
app.get('/api/v1/tours', (req, res) => {
  res
    .status(200)
    .json({ status: 'success', result: tours.length, data: { tours } });
});

//Responding to url parameteres.
app.get('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: { tour },
  });

  console.log(req.params);
});

//POST
app.post('/api/v1/tours', (req, res) => {
  console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({ status: 'success', data: { tour: newTour } });
    }
  );

  // res.send('Success');
});

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
