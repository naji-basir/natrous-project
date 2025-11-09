const express = require('express');
const tourController = require('./../controllers/tourController');
const router = express.Router();

// app.get('/api/v1/tours', getallTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

//TOURS
router
  .route('/')
  .get(tourController.getallTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
