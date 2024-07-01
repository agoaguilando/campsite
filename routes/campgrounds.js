const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds')
const catchAsync = require('../utils/catchAsync.js');
const{ isLoggedIn, validateCampground,  isAuthor } = require('../middleware');
const multer = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({ storage });


const ExpressError = require('../utils/ExpressError.js');
const Campground = require('../models/campground'); // import from campground.js

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn,  upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))
   
router.get('/new', isLoggedIn, campgrounds.renderNewForm );

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))


// router.get('/',catchAsync(campgrounds.index));
// // **********************************
// // CREATE - Campground
// // *****************`*****************
// router.get('/new', isLoggedIn, campgrounds.renderNewForm );

// router.post('/', isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground))
// // **********************************
// // READ / SHOW - Campground
// // **********************************
// router.get('/:id',  catchAsync(campgrounds.showCampground));
// // **********************************
// // UPDATE / EDIT - Campground
// // **********************************
// router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

// router.put('/:id/', isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground));
// // **********************************
// // DELETE - Campground
// // **********************************
// router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

module.exports = router;