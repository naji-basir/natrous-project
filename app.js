const express = require('express');
const fs = require('fs');
const app = express();

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from middleware 👋');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//♾️
const getallTours = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: 'success',
    result: tours.length,
    requestedAt: req.requestTime,
    data: { tours },
  });
};

//♾️
const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (id > tours.length) {
    return res.status(404).json({ status: 404, message: 'The Id Not Found!' });
  }

  res.status(200).json({
    status: 'success',
    data: { tour },
  });

  console.log(req.params);
};

//♾️
const createTour = (req, res) => {
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
};

//♾️
const updateTour = (req, res) => {
  const id = req.params.id * 1;

  if (id > tours.length)
    return res.status(404).json({ status: 'fail', message: 'invalid ID' });

  res
    .status(200)
    .json({ status: 'success', data: { tour: '<Updated tour here>' } });
};

//♾️
const deleteTour = (req, res) => {
  const id = req.params.id * 1;

  if (id > tours.length)
    return res.status(404).json({ status: 'fail', message: 'invalid ID' });

  res.status(204).json({ status: 'success', data: null });
};

//👌
// app.get('/api/v1/tours', getallTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

//👌
app.route('/api/v1/tours').get(getallTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
