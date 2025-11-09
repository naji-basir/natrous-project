const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

//♾️
exports.getallTours = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: 'success',
    result: tours.length,
    requestedAt: req.requestTime,
    data: { tours },
  });
};

//♾️
exports.getTour = (req, res) => {
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
exports.createTour = (req, res) => {
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
exports.updateTour = (req, res) => {
  const id = req.params.id * 1;

  if (id > tours.length)
    return res.status(404).json({ status: 'fail', message: 'invalid ID' });

  res
    .status(200)
    .json({ status: 'success', data: { tour: '<Updated tour here>' } });
};

//♾️
exports.deleteTour = (req, res) => {
  const id = req.params.id * 1;

  if (id > tours.length)
    return res.status(404).json({ status: 'fail', message: 'invalid ID' });

  res.status(204).json({ status: 'success', data: null });
};
