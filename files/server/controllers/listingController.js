const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const asyncWrapper = require('../middleware/asyncHandler');
const Listing = require('../models/listingModel');

const createListing = asyncWrapper(async (req, res) => {
  req.body.user = req.user.userId;
  const listing = await Listing.create(req.body);

  if (!listing) {
    throw new CustomError.BadRequestError('Listing cannot be created');
  }

  res
    .status(StatusCodes.CREATED)
    .json({ listing, msg: 'Listing created successful' });
});

const getAllListings = asyncWrapper(async (req, res) => {
  const listings = await Listing.find({});

  if (!listings) {
    throw new CustomError.NotFoundError('No listings found');
  }

  res.status(StatusCodes.OK).json({ listings });
});

const getListing = asyncWrapper(async (req, res) => {
  const { id: listingId } = req.params;
  const listing = await Listing.findOne({ _id: listingId });

  if (!listing) {
    throw new CustomError.NotFoundError(`No listing with id : ${listingId}`);
  }

  res.status(StatusCodes.OK).json({ listing });
});

const updateListing = asyncWrapper(async (req, res) => {
  const { id: listingId } = req.params;
  const listing = await Listing.findOneAndUpdate({ _id: listingId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!listing) {
    throw new CustomError.NotFoundError(`No listing with id : ${listingId}`);
  }

  res.status(StatusCodes.OK).json({ listing });
});

const deleteListing = asyncWrapper(async (req, res) => {
  const { id: listingId } = req.params;
  const listing = await Listing.findOneAndDelete({ _id: listingId });

  if (!listing) {
    throw new CustomError.NotFoundError(`No listing with id : ${listingId}`);
  }

  res.status(StatusCodes.OK).json({ msg: 'Listing deleted successfully' });
});

module.exports = {
  createListing,
  getAllListings,
  getListing,
  updateListing,
  deleteListing,
};
