const pdfParse = require("pdf-parse");
const {generateInterviewReport, generateResumePdf} = require("../services/ai.service");
const interviewReportModel = require('../models/interviewReport.model');

/** 
 * @description generate the interview report on the basis of resume, jobDescription, selfDescription
*/
async function generateInterviewController(req, res) {

    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText();
    const { selfDescription, jobDescription } = req.body
    const interviewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    });
    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAi
    });
    res.status(200).json({
        message: "Interview report generated successfully",
        interviewReport
    })

}

/**
 * @description controller to get the Report by the Interview ID 
 */

async function getInterviewReportByIdController(req, res) {
    const { interviewId } = req.params
    const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id });

    if (!interviewReport) {
        return res.status(400).json({
            message: "Interview Report not found",
        })
    }
    res.status(200).json({
        message: "Interview Report Fetch successfully",
        interviewReport
    })

}

/**
 * @description get all the interview report of an user
 */

async function getAllTheInterviewReportController(req, res) {
    const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestion -behavioralQuestion -skillGaps -preparationPlan");

    res.status(200).json({
        message:"InterviewReports Fetched successfully",
        interviewReports
    })
}

/**
 * @description generate the resume pdf on the basis of jobDescription , selfDescription, and on resume
 */

async function generateResumePdfController(req,res) {
    const {interviewReportId} = req.params;
    const interviewReport = await interviewReportModel.findById(interviewReportId);
    const{resume, jobDescription, selfDescription} = interviewReport

    if(!interviewReport){
        return res.status(404).json({
            message:"InterviewReport Not Found"
        })
    }
    const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription })

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
    })

    res.send(pdfBuffer)
    
}

module.exports = { generateInterviewController, getInterviewReportByIdController, getAllTheInterviewReportController, generateResumePdfController }