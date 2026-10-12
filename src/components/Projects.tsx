import '../styles/Projects.css';
import schafkopfVideo from '../assets/schafkopf.mp4';
import schafkopfPoster from '../assets/schafkopf-poster.jpg';
import donutImage from '../assets/donut.jpg';
import thesisImage from '../assets/thesis-img.jpg';
import thesisPdf from '../assets/thesis.pdf';
import huskLogo from '../assets/husk-logo.png';

function Projects() {
    return (
        <section id='projects' className='projects'>
            <h2 className="section-title">Projects</h2>
            <div className='projects-block'>
                <article className='card specific-project'>
                    <div className="project-media project-media-logo" style={{ backgroundColor: '#ff412c' }}>
                        <img src={huskLogo} alt="Husk app logo" loading="lazy" />
                    </div>
                    <h3>Husk – Danish Learning App</h3>
                    <ul className='tag-list' aria-label="Technologies">
                        <li>React Native</li>
                        <li>Expo</li>
                        <li>TypeScript</li>
                        <li>SQLite</li>
                        <li>Supabase</li>
                    </ul>
                    <p>
                        An offline-first mobile app for learning Danish vocabulary. Words are scheduled with the FSRS
                        spaced-repetition algorithm, so each one comes back right before you would forget it.
                    </p>
                    <p>
                        Lessons follow the CEFR levels A1–B1 and unlock step by step, with pronunciation audio,
                        verb and grammar drills, and optional sync between devices.
                    </p>
                    <p className="project-status">Currently in development</p>
                </article>

                <article className='card specific-project'>
                    <video className="project-media" controls preload="none" poster={schafkopfPoster}>
                        <source src={schafkopfVideo} type="video/mp4" />
                        Your browser does not support video playback.
                    </video>
                    <h3>Schafkopf – Multiplayer Card Game</h3>
                    <ul className='tag-list' aria-label="Technologies">
                        <li>React</li>
                        <li>UI Design</li>
                        <li>Card Design</li>
                    </ul>
                    <p>
                        A digital version of the traditional Bavarian card game Schafkopf, built in React. My goal is to make
                        my favourite card game accessible to people outside of Bavaria.
                    </p>
                    <p>
                        I redesigned the traditional cards and added helpful information to them, so beginners can pick up
                        the game more easily – and I have more people to play with in Denmark.
                    </p>
                    <p className="project-status">Playable demo coming soon</p>
                </article>

                <article className='card specific-project'>
                    <img className="project-media" src={donutImage} alt="Screenshot of the game Donut Wars" loading="lazy" />
                    <h3>Donut Wars – Survival Game</h3>
                    <ul className='tag-list' aria-label="Technologies">
                        <li>Unity</li>
                        <li>C#</li>
                        <li>Game Design</li>
                    </ul>
                    <p>
                        A 2D survival game in Unity where players defend a bakery from hungry creatures by feeding them
                        baked goods.
                    </p>
                    <p>
                        The project combines gameplay programming, player interaction, game-state management, and a playful
                        visual style with catchy music for a slightly addictive gaming experience.
                    </p>
                    <div className="project-links">
                        <a className="button button-dark" href="https://mariagamingcorner.itch.io/donut-wars" target="_blank" rel="noopener noreferrer">
                            Play Donut Wars
                        </a>
                    </div>
                </article>

                <article className='card specific-project'>
                    <img className="project-media" src={thesisImage} alt="Visualisation from my Master's thesis on multilingual named entity recognition" loading="lazy" />
                    <h3>Master's Thesis – Multilingual NER</h3>
                    <ul className='tag-list' aria-label="Technologies">
                        <li>Python</li>
                        <li>Transformers</li>
                        <li>NLP</li>
                        <li>Explainable AI</li>
                    </ul>
                    <p>
                        I investigated how multilingual transformer models represent named entities across English, Dutch,
                        and Spanish. I fine-tuned and compared XLM-R and mT5 models for named entity recognition and used
                        attention visualisation, Integrated Gradients, and SHAP to analyse their predictions and errors.
                    </p>
                    <div className="project-links">
                        <a className="button button-dark" href={thesisPdf} target="_blank" rel="noopener noreferrer">
                            Read the thesis (PDF)
                        </a>
                    </div>
                </article>
            </div>
        </section>
    );
}

export default Projects;
