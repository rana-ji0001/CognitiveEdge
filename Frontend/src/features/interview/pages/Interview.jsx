import { useState } from 'react'
import '../style/interview.scss'

const previewReport = {
    matchScore: 85,
    technicalQuestion: [
        {
            question: 'You mentioned optimizing MongoDB queries by 25% during your internship. Can you explain the specific techniques you used?',
            intention: "To assess the candidate's practical understanding of database performance and their ability to handle real-world backend challenges.",
            answer: 'Focus on indexing strategies, query profiling using explain(), avoiding unnecessary fields in projection, and optimizing data retrieval patterns. Mention identifying slow-running queries and implementing compound indexes or better schema structures.',
        },
        {
            question: 'How do you manage state across multiple components in your React applications like NimbusNote?',
            intention: 'To evaluate knowledge of React state management patterns and the ability to build scalable frontend architectures.',
            answer: 'Discuss React Hooks like useState and useReducer for local state, and the Context API or Redux for global state. Explain lifting state up and the benefits of centralized state management in larger applications.',
        },
        {
            question: 'Explain the end-to-end flow of JWT authentication that you implemented in your NimbusNote project.',
            intention: "To verify the candidate's understanding of security, authentication protocols, and backend middleware logic.",
            answer: 'Describe the user logging in, the server generating a signed token, the client storing it, and sending it in the Authorization header. Mention token verification logic in Node.js middleware.',
        },
    ],
    behavioralQuestion: [
        {
            question: 'Describe a situation where you had a conflict with a teammate regarding a technical decision. How did you resolve it?',
            intention: 'To measure teamwork, communication skills, and the ability to reach a consensus in a professional setting.',
            answer: "Use the STAR method. Describe the technical disagreement, how you presented data or alternatives, and how you collaborated to find the best solution for the project's success.",
        },
        {
            question: "The job description mentions TypeScript and Docker, which aren't in your current primary stack. How do you plan to get up to speed?",
            intention: "To evaluate the candidate's learning agility and proactive approach to professional development.",
            answer: 'Highlight past experiences where you learned a technology quickly. Mention specific resources or a learning plan and emphasize your willingness to adapt to the team’s stack.',
        },
    ],
    skillGaps: [
        { skill: 'TypeScript', severity: 'medium' },
        { skill: 'Docker & Containerization', severity: 'low' },
        { skill: 'CI/CD Pipelines', severity: 'low' },
        { skill: 'Cloud Platforms (AWS)', severity: 'low' },
    ],
    preparationPlan: [
        {
            day: '1',
            focus: 'React Advanced Concepts',
            task: [
                'Review React Hooks (useMemo, useCallback) and performance optimization techniques.',
                'Practice building a reusable component library similar to the JD requirements.',
                'Study modern state management patterns using Context API.',
            ],
        },
        {
            day: '2',
            focus: 'Node.js & Backend Architecture',
            task: [
                'Review REST API best practices and error handling middleware.',
                'Brush up on MongoDB aggregation pipelines and advanced indexing.',
                'Practice writing clean, maintainable Express.js code.',
            ],
        },
        {
            day: '3',
            focus: 'Security and Authentication',
            task: [
                'Deep dive into JWT, Refresh Tokens, and OAuth concepts.',
                'Review common web security vulnerabilities like CORS and XSS.',
                'Practice securing API endpoints using custom middleware.',
            ],
        },
        {
            day: '4',
            focus: 'Bridging Skill Gaps',
            task: [
                'Complete a crash course on TypeScript basics and integrating it with React.',
                'Read basic documentation on Docker and containerize a MERN application.',
                'Understand CI/CD and deployment fundamentals on AWS or Heroku.',
            ],
        },
        {
            day: '5',
            focus: 'Mock Interviews & Soft Skills',
            task: [
                'Practice explaining your internship contributions using the STAR method.',
                'Conduct a mock technical interview focusing on JavaScript fundamentals.',
                'Review your projects and prepare to discuss technical challenges.',
            ],
        },
    ],
}

const sections = [
    { id: 'technical', label: 'Technical Questions', eyebrow: 'Technical assessment' },
    { id: 'behavioral', label: 'Behavioral Questions', eyebrow: 'Behavioral assessment' },
    { id: 'roadmap', label: 'Preparation Roadmap', eyebrow: '5-day action plan' },
]

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

const Interview = ({ data = previewReport }) => {
    const [activeSection, setActiveSection] = useState('technical')
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
                </nav>

                <section className="report-content" aria-live="polite">
                    <div className="report-content__heading">
                        <span>{currentSection.eyebrow}</span>
                        <h2>{currentSection.label}</h2>
                    </div>

                    {activeSection === 'technical' && <QuestionList questions={data.technicalQuestion || []} />}
                    {activeSection === 'behavioral' && <QuestionList questions={data.behavioralQuestion || []} />}
                    {activeSection === 'roadmap' && <Roadmap plan={data.preparationPlan || []} />}
                </section>

                <aside className="skill-panel">
                    <div className="match-score">
                        <div className="match-score__ring" style={{ '--score': `${data.matchScore || 0}%` }}>
                            <strong>{data.matchScore || 0}</strong>
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
                        {(data.skillGaps || []).map((item) => (
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
