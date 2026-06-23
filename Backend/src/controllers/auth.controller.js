const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookie = require('cookie-parser');
const blacklistTokenModel = require('../models/blacklist.model');


/**
 * @route Post /api/auth/register
 * @description registerUserController logic expects email , username and the password in the body
 * @access Public
 */
async function registerUserController(req, res) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(409).json({ message: "Fill the Details Correctly" });
    }

    const isUserAlreadyExist = await userModel.findOne(
        {
            $or: [{ username }, { email }]
        }
    );
    if (isUserAlreadyExist) {
        return res.status(409).json({ message: "The User with these credentials already Exists" });
    }
    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash
    });

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1D" }
    );

    res.cookie('token', token)

    res.status(201).json({
        message: "User Registered Successfully",
        user: {
            userId: user._id,
            username: user.username,
            email: user.email,
        }

    })




}

/**
 * @route Post /api/auth/login
 * @description loginUserController logic expect email and the password in the body
 * @access Public
 */
async function loginUserController(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({
        email
    });

    if (!user) {
        return res.status(409).json({
            message: "Invalid email"
        });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(409).json({
            message: "Wrong Password"
        });
    }
    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1D" }
    );

    res.cookie('token', token)

    res.status(201).json({
        message: "User LoggedIn Successfully",
        user: {
            userId: user._id,
            username: user.username,
            email: user.email,

        }
    });

}

/**
 * @route Get /api/auth/logout
 * @description logoutUserController do not expect anything in the body
 * @access Private
 */
async function logoutUserController(req, res) {
    const token = req.cookies.token;
    if (token) {
        await blacklistTokenModel.create({ token });

    }

    res.clearCookie("token");
    res.status(200).json({ message: "User Logout Successfully" })

}

/**
 * @route Get /api/auth/get-me
 * @description getMeController the current login user details
 * @access Private
*/


async function getMeController(req, res) {
    const user = await userModel.findById(req.user.id);

    res.status(200).json({
        message: "User Details Fetched Successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,

        }
    })

}

module.exports = { registerUserController, loginUserController, logoutUserController, getMeController }