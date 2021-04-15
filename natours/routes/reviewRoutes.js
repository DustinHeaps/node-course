const express = require('express');
const { protectedRoute, restrictTo } = require('../controllers/authController');
const {
  getAllReviews,
  setTourUserIds,
  createReview,
  getReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');


const router = express.Router({ mergeParams: true });

router.use(protectedRoute);

router
  .route('/')
  .get(getAllReviews)
  .post(restrictTo('user'), setTourUserIds, createReview);

router
  .route('/:id')
  .get(getReview)
  .patch(restrictTo('user', 'admin'), updateReview)
  .delete(restrictTo('user', 'admin'), deleteReview);

module.exports = router;
