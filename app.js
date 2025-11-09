const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const { json } = require('stream/consumers');
const app = express();

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// 1) MIDLLEWARES
app.use(express.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
  console.log('Hello from middleware 👋');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2) Route Handlers
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

//♾️
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined yet!',
  });
};

//♾️
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined yet!',
  });
};

//♾️
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined yet!',
  });
};

//♾️
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined yet!',
  });
};

//♾️
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined yet!',
  });
};

// 3) ROUTES

// app.get('/api/v1/tours', getallTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

const userRouter = express.Router();
const tourRouter = express.Router();

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//TOURS
tourRouter.route('/').get(getallTours).post(createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

//USERS
userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

//4) START SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
