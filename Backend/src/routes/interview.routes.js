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

/**
 * @route Get /api/interview/report/:interviewId
 * @description get interview report by the interviewId
 * @access Private
 */
interviewRouter.get("/report/:interviewId",authMiddleware.authUser,interviewController.getInterviewReportByIdController)

/**
 * @router Get /api/interview/
 * @description get all the interview report of an user
 * @access Private
 */

interviewRouter.get("/reports",authMiddleware.authUser, interviewController.getAllTheInterviewReportController)


/**
 * @router Get /api/interview/resume/pdf
 * @description generate an resume on user on the basis of jobDescription, selfDescription, resume
 * @access Private
 */
interviewRouter.post("/resume/pdf/:interviewReportId",authMiddleware.authUser,interviewController.generateResumePdfController)

module.exports = interviewRouter