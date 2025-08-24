const express = require('express');
const router = express.Router();

const {
  createTravelGroup,
  getAllTravelGroups,
  getTravelGroup,
  updateTravelGroup,
  deleteTravelGroup,
} = require('../controllers/travelGroupsController');

router.route('/').post(createTravelGroup).get(getAllTravelGroups);

router
  .route('/:id')
  .get(getTravelGroup)
  .patch(updateTravelGroup)
  .delete(deleteTravelGroup);

module.exports = router;
