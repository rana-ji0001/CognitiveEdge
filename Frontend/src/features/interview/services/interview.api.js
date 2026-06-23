import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL:`${API_URL}/api`,
    withCredentials:true,
});

/** 
 * @description service to generate the interview report with the input like jobDescription, selfDescription, and resume 
 */
export const generateInterviewReport = async({ jobDescription, selfDescription, resumeFile }) => {
    const formdata = new FormData();
    formdata.append("jobDescription",jobDescription)
    formdata.append("selfDescription",selfDescription)
    formdata.append("resume",resumeFile)

    const response = await api.post("/interview",formdata,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    });
    return response.data
}

/** 
 * @description service to get the interview report by the id
*/
export const getInterviewReportById = async(interviewId) => {
    const response = await api.get(`/interview/report/${interviewId}`);
    return response.data;

}

/**
 * @description service to get all the reports of an user
 */

export const getAllInterviewReports = async() =>{
    const response  = await api.get("/interview/reports");
    return response.data

}

/**
 * @description service for generate the resume pdf on basis of jobDescription, selfDescription, and resume
 */

export const generateResumePdf = async ({ interviewReportId }) => {
    const response = await api.post(`/interview/resume/pdf/${interviewReportId}`, null, {
        responseType: "blob"
    })

    return response.data
}