const mongoose = require('mongoose');

const wishListSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Listing',
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const WishList = mongoose.model('WishList', wishListSchema);

module.exports = WishList;
