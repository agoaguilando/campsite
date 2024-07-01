const express = require('express');
const router = express.Router({ mergeParams: true });
const{ validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');

const Campground = require('../models/campground'); // import from campground.js
const Review = require('../models/review'); // import from review.js
const reviews = require('../controllers/reviews')
const ExpressError = require('../utils/ExpressError.js');
const catchAsync = require('../utils/catchAsync.js');


// **********************************
// CREATE - Reviews
// **********************************
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

// **********************************
// DELETE - Reviews
// **********************************
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))


module.exports = router;