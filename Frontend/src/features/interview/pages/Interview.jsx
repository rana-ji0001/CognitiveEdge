import { useState, useEffect } from 'react'
import '../style/interview.scss'
import { useInterview } from '../hooks/useInterview'
import { useParams } from 'react-router'
import { FaDownload } from "react-icons/fa";





const QuestionList = ({ questions }) => (
    <div className="question-list">
        {questions.map((item, index) => (
            <article className="question-card" key={item._id?.$oid || item.question}>
                <span className="question-card__number">{String(index + 1).padStart(2, '0')}</span>
                <div>
                    <h3>{item.question}</h3>
                    <div className="question-card__detail">
                        <strong>Why they’ll ask</strong>
                        <p>{item.intention}</p>
                    </div>
                    <div className="question-card__detail question-card__detail--answer">
                        <strong>Answer direction</strong>
                        <p>{item.answer}</p>
                    </div>
                </div>
            </article>
        ))}
    </div>
)

const Roadmap = ({ plan }) => (
    <div className="roadmap">
        {plan.map((item) => (
            <article className="roadmap-card" key={item._id?.$oid || item.day}>
                <div className="roadmap-card__day"><span>Day</span>{item.day}</div>
                <div>
                    <h3>{item.focus}</h3>
                    <ul>
                        {item.task.map((task) => <li key={task}>{task}</li>)}
                    </ul>
                </div>
            </article>
        ))}
    </div>
)

const Interview = () => {
    const { interviewId } = useParams();
    const { report, loading, getReportById, getResumePdf } = useInterview();
    const [activeSection, setActiveSection] = useState('technical')
    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId);
        }
    }, [interviewId]);
    if (loading || !report) {
        return (<main className='loading-screen'>
            <h1>Loading Your Interview Plan</h1>
        </main>)
    }
    const sections = [
        { id: 'technical', label: 'Technical Questions', eyebrow: `${report?.technicalQuestion?.length} Technical Questions` },
        { id: 'behavioral', label: 'Behavioral Questions', eyebrow: `${report?.behavioralQuestion?.length} Behavioral Questions` },
        { id: 'roadmap', label: 'Preparation Roadmap', eyebrow: `${report?.preparationPlan?.length} Day Plan` },
    ]
    const currentSection = sections.find((section) => section.id === activeSection)

    return (
        <main className="interview-report">
            <header className="interview-report__header">
                <div className="report-brand">
                    <span className="report-brand__mark">✦</span>
                    <span>Cognitive Edge</span>
                </div>
                <span className="report-label">AI interview strategy report</span>
            </header>

            <section className="report-shell">
                <nav className="report-nav" aria-label="Interview report sections">
                    <div className="report-nav__intro">
                        <span>Your report</span>
                        <h1>Interview<br />Blueprint</h1>
                    </div>


                    <div className="report-nav__items">
                        {sections.map((section, index) => (
                            <button
                                className={activeSection === section.id ? 'is-active' : ''}
                                key={section.id}
                                type="button"
                                onClick={() => setActiveSection(section.id)}
                            >
                                <span>0{index + 1}</span>
                                {section.label}
                            </button>
                        ))}
                    </div>
                    <button className='button primary-button dwnbtn' onClick={()=>{getResumePdf(interviewId)}} >
                        Get Your AI Generated Resume<FaDownload size={18} />
                    </button>
                </nav>

                <section className="report-content" aria-live="polite">
                    <div className="report-content__heading">
                        <span>{currentSection.eyebrow}</span>
                        <h2>{currentSection.label}</h2>
                    </div>

                    {activeSection === 'technical' && <QuestionList questions={report.technicalQuestion || []} />}
                    {activeSection === 'behavioral' && <QuestionList questions={report.behavioralQuestion || []} />}
                    {activeSection === 'roadmap' && <Roadmap plan={report.preparationPlan || []} />}
                </section>

                <aside className="skill-panel">
                    <div className="match-score">
                        <div className="match-score__ring" style={{ '--score': `${report.matchScore || 0}%` }}>
                            <strong>{report.matchScore || 0}</strong>
                            <span>/100</span>
                        </div>
                        <div>
                            <span>Profile match</span>
                            <strong>Strong Match</strong>
                        </div>
                    </div>

                    <div className="skill-panel__heading">
                        <span>Focus areas</span>
                        <h2>Skill Gaps</h2>
                    </div>

                    <div className="skill-chips">
                        {(report.skillGaps || []).map((item) => (
                            <span className={`skill-chip skill-chip--${item.severity}`} key={item._id?.$oid || item.skill}>
                                {item.skill}
                                <small>{item.severity}</small>
                            </span>
                        ))}
                    </div>

                    <p className="skill-panel__note">
                        Prioritize these topics to strengthen your preparation before the interview.
                    </p>
                </aside>
            </section>
        </main>
    )
}

export default Interview
