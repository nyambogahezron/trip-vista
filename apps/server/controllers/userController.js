const asyncHandler = require('../middleware/asyncHandler.js');
const User = require('../models/userModel.js');
const generateToken = require('../utils/generateToken.js');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new CustomError.BadRequestError('User already exists');
  }

  if (!name || !email || !password) {
    throw new CustomError.BadRequestError('Please provide all fields');
  }

  if (password?.length < 6) {
    throw new CustomError.BadRequestError(
      'Password must be at least 6 characters'
    );
  }

  const avatarPath = req.file?.path;

  const avatar = 'http://localhost:5000' + avatarPath;

  if (avatar) {
    console.log(avatar);
  }

  // Check if the user is the first user
  const userCount = await User.countDocuments();
  const role = userCount === 0 ? 'admin' : 'user';

  const user = await User.create({
    name,
    email,
    password,
    avatar,
    role,
  });

  if (user) {
    const token = generateToken(res, user._id);
    user.password = undefined;

    res.status(StatusCodes.CREATED).json({ user, token });
  } else {
    throw new CustomError.BadRequestError('Invalid user data');
  }
});

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.BadRequestError('Invalid email or password');
  }

  const isPasswordValid = await user.matchPassword(password);

  if (!isPasswordValid) {
    throw new CustomError.UnauthorizedError('Invalid email or password');
  }

  // generate token
  const token = generateToken(res, user._id);

  user.password = undefined; // remove password from the response

  res.status(StatusCodes.OK).json({ user, token });
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(StatusCodes.OK).json({ message: 'Logged out successfully' });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new CustomError.NotFoundError('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    throw new CustomError.NotFoundError('User not found');
  }
});
module.exports = {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
