const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('./../controllers/authController');
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgetPassword', authController.forgetPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.patch('/updateMyPassword',authController.protect,authController.updatePassword);
router.patch('/updateMe',authController.protect,userController.updateMe);
router.delete('/deleteMe',authController.protect,userController.deleteMe);
router.get('/', userController.getAllUsers);      // GET all users
router.post('/', userController.createUser);     // POST new user
router.get('/:id', userController.getUserById);  // GET user by id
router.patch('/:id', userController.updateUser); // PATCH user
router.delete('/:id', userController.deleteUser); //Delete



module.exports = router;


