const express = require('express');
const {
  signUp,
  login,
  forgotPassword,
  resetPassword,
  protectedRoute,
  updatePassword
} = require('../controllers/authController');

const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe
} = require('../controllers/userController');

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);

router.post('/forgot-password', forgotPassword);
router.patch('/reset-password/:token', resetPassword);

router.patch('/update-my-password', protectedRoute, updatePassword);

router.patch('/update-me', protectedRoute, updateMe);
router.delete('/delete-me', protectedRoute, deleteMe);

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
