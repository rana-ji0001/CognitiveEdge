import { InterviewContext } from "../interview.context";
import { getAllInterviewReports, generateInterviewReport, getInterviewReportById } from "../services/interview.api";
import { useContext } from "react";


export const useInterview = () => {
    const context = useContext(InterviewContext);
    if (!context) {
        throw new Error("useInterview must be used within the InterviewProvider");

    }
    const { loading, setLoading, report, setReport, reports, setReports } = context;


    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true);
        try {
            const response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile });
            setReport(response.interviewReport);

        } catch (error) {
            console.log(error)

        } finally {

            setLoading(false);
        }

    }
    const getReportById = async ({ interviewId }) => {
        setLoading(true);
        try {
            const response = await getInterviewReportById({interviewId});
            setReport(response.interviewReport);

        } catch (error) {
            console.log(error)

        } finally {

            setLoading(false);
        }
    }
    const getAllReports = async () => {
        setLoading(true);
        try {
            const response = await getAllInterviewReports();
            setReport(response.interviewReports);

        } catch (error) {
            console.log(error)

        } finally {

            setLoading(false);
        }
    }
    return {report,loading,generateReport, getAllReports, getReportById}
}