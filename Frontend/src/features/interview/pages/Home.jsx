import '../style/home.scss'

const DocumentIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 3.75h6.25L17.5 8v12.25H7z" />
        <path d="M13 3.75V8h4.5M9.5 12h5M9.5 15h5" />
    </svg>
)

const UploadIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 3.75h6.25L17.5 8v12.25H7z" />
        <path d="M13 3.75V8h4.5M12.25 17v-5.5m0 0-2.1 2.1m2.1-2.1 2.1 2.1" />
    </svg>
)

const PeopleIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="9" cy="8" r="2.5" />
        <circle cx="16.5" cy="9" r="2" />
        <path d="M4.5 18c.35-3.1 2-4.7 4.5-4.7s4.15 1.6 4.5 4.7M14.1 14.1c2.9-.6 4.8.75 5.25 3.4" />
    </svg>
)

const Home = () => {
    return (
        <main className="home">
            <div className="home__page">
                <header className="brand" aria-label="Cognitive Edge">
                    <span className="brand__mark">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M9.2 17.5h5.6M10 20h4M8.3 14.5c-1.3-1-2.1-2.6-2.1-4.4a5.8 5.8 0 0 1 11.6 0c0 1.8-.8 3.4-2.1 4.4-.7.6-.9 1.1-.9 1.8H9.2c0-.7-.2-1.2-.9-1.8Z" />
                            <path d="M10 10.2a2 2 0 0 1 4 0c0 1.3-1 1.6-1.4 2.5" />
                        </svg>
                    </span>
                    <span>Cognitive Edge</span>
                </header>

                <section className="hero">
                    <p className="hero__eyebrow">AI-powered interview preparation</p>
                    <h1>Accelerate your career with<br />technical precision.</h1>
                    <p className="hero__copy">
                        Input your target job details and background to generate a custom-engineered
                        interview strategy and preparation roadmap.
                    </p>
                </section>

                <form className="strategy-form">
                    <section className="form-card form-card--job">
                        <div className="field-heading">
                            <label htmlFor="jobDescription">
                                Job Description <span className="field-heading__icon"><DocumentIcon /></span>
                            </label>
                            <span className="required-badge">Required</span>
                        </div>
                        <textarea
                            id="jobDescription"
                            name="jobDescription"
                            placeholder="Paste the full job description here... (Responsibilities, Requirements, Tech Stack)"
                        />
                    </section>

                    <div className="strategy-form__side">
                        <section className="form-card form-card--resume">
                            <div className="field-heading">
                                <label htmlFor="resume">Professional Resume</label>
                                <span className="required-badge">Best Result</span>
                            </div>
                            <label className="upload-zone" htmlFor="resume">
                                <span className="upload-zone__icon"><UploadIcon /></span>
                                <strong>Click to upload or drag and drop</strong>
                                <small>PDF, DOCX up to 10MB</small>
                            </label>
                            <input id="resume" name="resume" type="file" accept=".pdf,.doc,.docx" hidden />
                        </section>

                        <section className="form-card form-card--self">
                            <div className="field-heading">
                                <label htmlFor="selfDescription">
                                    Self Description <span className="field-heading__icon field-heading__icon--people"><PeopleIcon /></span>
                                </label>
                            </div>
                            <textarea
                                id="selfDescription"
                                name="selfDescription"
                                placeholder="Add extra context: specific accomplishments, target salary range, or areas you want to highlight..."
                            />
                        </section>

                        <aside className="analysis-card" aria-label="Report generation requirement">
                            <p className="analysis-card__notice">
                                Either Resume or Self Description is required to generate report
                            </p>
                            <div className="analysis-card__code" aria-hidden="true">
                                <span>01  role.profile = parse(job_description)</span>
                                <span>02  experience = extract(resume)</span>
                                <span>03  strategy.optimize(precision)</span>
                            </div>
                        </aside>
                    </div>

                    <div className="social-proof">
                        <span className="social-proof__avatars" aria-hidden="true">
                            <i></i><i></i><i></i>
                        </span>
                        <span><strong>AI-Powered</strong> Strategy Generation Quick</span>
                    </div>

                    <button className="generate-button" type="button">
                        <span aria-hidden="true">★</span> Generate My Interview Strategy
                    </button>
                </form>
            </div>

            <footer className="home-footer">
                <div className="home-footer__inner">
                    <strong>Cognitive Edge</strong>
                    <nav aria-label="Footer navigation">
                        <a href="#terms">Terms of Service</a>
                        <a href="#privacy">Privacy Policy</a>
                        <a href="#support">Contact Support</a>
                        <a href="#resources">Career Resources</a>
                    </nav>
                    <small>© 2024 Cognitive Edge. All rights reserved.</small>
                </div>
            </footer>
        </main>
    )
}

export default Home
