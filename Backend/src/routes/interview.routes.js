const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const interviewController = require("../controllers/interview.controller");
const upload = require("../middlewares/file.middleware");

const interviewRouter = express.Router();


/**
 * @route Post /api/interview
 * @description generate new interview report on the basis of user selfDescription , resume pdf and jobDescription
 * @access Private
 */
interviewRouter.post("/",authMiddleware.authUser,upload.single("resume"), interviewController.generateInterviewController);



module.exports = interviewRouter