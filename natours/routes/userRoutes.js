const express = require('express');
const {
  signUp,
  login,
  forgotPassword,
  resetPassword,
  protectedRoute,
  updatePassword,
  restrictTo
} = require('../controllers/authController');

const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe
} = require('../controllers/userController');

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.patch('/reset-password/:token', resetPassword);

//protect all routes after this middleware
router.use(protectedRoute)

router.patch('/update-my-password', updatePassword);
router.get('/me', getMe, getUser)
router.patch('/update-me', updateMe);
router.delete('/delete-me', deleteMe);

router.use(restrictTo('admin'))

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
