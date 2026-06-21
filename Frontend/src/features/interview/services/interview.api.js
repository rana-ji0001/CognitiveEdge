import axios from 'axios';

const api = axios.create({
    baseURL:"http://localhost:3000/api",
    withCredentials:true,
});

/** 
 * @description service to generate the interview report with the input like jobDescription, selfDescription, and resume 
 */
export const generateInterviewReport = async({selfDescription, jobDescription, resumeFile}) => {
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
    const response = await api.get(`/interview/report/:${interviewId}`);
    return response.data;

}

/**
 * @description service to get all the reports of an user
 */

export const getAllInterviewReports = async() =>{
    const response  = await api.get("/interview/report");
    return response.data

}