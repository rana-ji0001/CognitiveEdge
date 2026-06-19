const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

/**
 * @route Post /api/auth/register
 * @description register the user 
 * @access Public
 */
authRouter.post('/register', authController.registerUserController);

/**
 * @route Post /api/auth/login
 * @description login the user with email and pass
 * @access Publis access
 */
authRouter.post('/login', authController.loginUserController);

/**
 * @route Get /api/auth/logout
 * @description clear token from the cookie and add the token to the blacklist
 * @access Public
 */

authRouter.get('/logout',authController.logoutUserController);

/**
 * @route Get /api/auth/get-me
 * @description get the current login user details
 * @access Private
*/
authRouter.get('/get-me',authMiddleware.authUser, authController.getMeController);


module.exports = authRouter