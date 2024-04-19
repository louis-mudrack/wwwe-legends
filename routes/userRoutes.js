const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/verify', authController.protect, authController.verify);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);

router.patch('/updateMyPassword', authController.protect, authController.updatePassword);
router.get('/me', authController.protect, userController.getMe, userController.getUser);
router.patch(
    '/updateMe',
    authController.protect,
    userController.uploadUserPhoto,
    userController.deleteOldPhoto,
    userController.resizeUserPhoto,
    userController.updateMe
);
router.delete('/deleteMe', authController.protect, userController.deleteMe);

router.route('/').get(authController.restrictTo('admin'), userController.getAllUsers);

router
    .route('/:id')
    .get(authController.restrictTo('admin'), userController.getUser)
    .patch(authController.restrictTo('admin'), userController.updateUser)
    .delete(authController.restrictTo('admin'), userController.deleteUser);

module.exports = router;
