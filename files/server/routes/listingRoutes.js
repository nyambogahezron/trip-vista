const express = require('express');
const router = express.Router();

const {
  createListing,
  getAllListings,
  getListing,
  updateListing,
  deleteListing,
} = require('../controllers/listingController');

router.route('/').post(createListing).get(getAllListings);

router.route('/:id').get(getListing).put(updateListing).delete(deleteListing);

module.exports = router;
