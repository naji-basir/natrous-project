const Tour = require('../models/tourModel');

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res
      .status(400)
      .json({ status: 'fail', message: 'Missing name or price' });
  }
  next();
};

//♾️
exports.getallTours = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: 'success',
    // result: tours.length,
    // requestedAt: req.requestTime,
    // data: { tours },
  });
};

//♾️
exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  // const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: { tour },
  });

  console.log(req.params);
};

//♾️
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: { tour: newTour },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

//♾️
exports.updateTour = (req, res) => {
  const id = req.params.id * 1;

  res
    .status(200)
    .json({ status: 'success', data: { tour: '<Updated tour here>' } });
};

//♾️
exports.deleteTour = (req, res) => {
  res.status(204).json({ status: 'success', data: null });
};

const x = 12;
