const mongoose = require('mongoose');

const travelGroupSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  joinedOn: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TravelGroup = mongoose.model('TravelGroup', travelGroupSchema);

module.exports = TravelGroup;
