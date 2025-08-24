const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
<<<<<<< HEAD
      default: 'https://res.cloudinary',
    },
    role: {
      type: String,
      enum: ['user, admin'],
=======
      default: 'http://localhost:5000/uploads/user.png',
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
>>>>>>> refs/remotes/origin/main
      default: 'user',
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  const userPassword = enteredPassword.toString();
  return await bcrypt.compare(userPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

module.exports = User;
