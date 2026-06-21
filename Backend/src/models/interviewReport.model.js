const mongoose = require('mongoose');


/**
 * (User Provide these)
 * -job description:String
 * -resume text:String
 * -self description:String
 * 
 * -matchScore: Number
 * 
 * (AI reports)
 * -Technical question:
 *      [{
 *          question:"",
 *          intention:"",
 *          answer:""
 *      }]
 * -Behavioural question:[
 * {
 *          question:"",
 *          intention:"",
 *          answer:""
 *      }]
 * -Skill gaps:[{
 *          skills:"",
 *          severity:{
 *              type:String
 *              enum:["low","medium","high"]
 *              }
 *          }]
 * -Prepration plan:[{
 *              day:number,
 *              focus:String,
 *              task:[Strings]
 *          }]
 * 
 */

const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Technical question is required"]
    },
    intention: {
        type: String,
        required: [true, "Intention is required"]
    },
    answer: {
        type: String,
        required: [true, "Answer is required"]
    }

}, { id: false })
const behavioralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Technical question is required"]
    },
    intention: {
        type: String,
        required: [true, "Intention is required"]
    },
    answer: {
        type: String,
        required: [true, "Answer is required"]
    }

}, { id: false });

const skillGapSchema = new mongoose.Schema({
    skill:{
        type:String,
        required:[true, "Skills are required"]
    },
    severity: {
        type: String,
        enum: ["low", "medium", "high"],
        required:[true,"severity is required"]
    }
 

}, { id: false });

const preparationPlanSchema = new mongoose.Schema({
    day:{
        type:String,
        required:[true,"Day is required"]
    },
    focus:{
        type:String,
        required:[true,"focus is required"]
    },
    task:[{
        type:String,
        required:[true,"task is required"]
    }],
})


const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: true
    },
    resume: {
        type: String,
    },
    selfDescription: {
        type: String
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100
    },
    technicalQuestion: [technicalQuestionSchema],
    behavioralQuestion: [behavioralQuestionSchema],
    skillGaps:[skillGapSchema],
    preparationPlan:[preparationPlanSchema],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
},{
    timestamps:true
});



const interviewReportModel = mongoose.model("InterviewReport",interviewReportSchema)

module.exports = interviewReportModel