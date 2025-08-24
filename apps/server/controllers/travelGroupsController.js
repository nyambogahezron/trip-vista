const { StatusCodes } = require('http-status-codes');
const TravelGroup = require('../models/travelGroupsModels');
const CustomError = require('../errors');
const asyncWrapper = require('../middleware/asyncHandler');

const createTravelGroup = asyncWrapper(async (req, res) => {
  req.body.user = req.user.userId;
  const travelGroup = await TravelGroup.create(req.body);

  res.status(StatusCodes.CREATED).json({ travelGroup });
});

const getAllTravelGroups = asyncWrapper(async (req, res) => {
  const travelGroups = await TravelGroup.find({});

  if (!travelGroups) {
    throw new CustomError.NotFoundError('No travel groups found');
  }

  res.status(StatusCodes.OK).json({ travelGroups });
});

const getTravelGroup = asyncWrapper(async (req, res) => {
  const { id: travelGroupId } = req.params;
  const travelGroup = await TravelGroup.findOne({ _id: travelGroupId });

  if (!travelGroup) {
    throw new CustomError.NotFoundError(
      `No travel group with id : ${travelGroupId}`
    );
  }

  res.status(StatusCodes.OK).json({ travelGroup });
});

const updateTravelGroup = asyncWrapper(async (req, res) => {
  const { id: travelGroupId } = req.params;
  const travelGroup = await TravelGroup.findOneAndUpdate(
    { _id: travelGroupId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!travelGroup) {
    throw new CustomError.NotFoundError(
      `No travel group with id : ${travelGroupId}`
    );
  }

  res.status(StatusCodes.OK).json({ travelGroup });
});

const deleteTravelGroup = asyncWrapper(async (req, res) => {
  const { id: travelGroupId } = req.params;
  const travelGroup = await TravelGroup.findOneAndDelete({
    _id: travelGroupId,
  });

  if (!travelGroup) {
    throw new CustomError.NotFoundError(
      `No travel group with id : ${travelGroupId}`
    );
  }

  res.status(StatusCodes.OK).json({ travelGroup });
});


module.exports = {
    createTravelGroup,
    getAllTravelGroups,
    getTravelGroup,
    updateTravelGroup,
    deleteTravelGroup,
}