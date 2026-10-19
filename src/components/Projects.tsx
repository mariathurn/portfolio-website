import { useEffect, useState } from 'react';
import '../styles/Projects.css';
import AlmsommerStory, { ALMSOMMER_URL } from './AlmsommerStory';
import HuskStory from './HuskStory';
import GithubIcon from './GithubIcon';
import { ALMSOMMER_REPO_URL } from '../links';
import almsommerImage from '../assets/almsommer.jpg';
import donutImage from '../assets/donut.jpg';
import thesisImage from '../assets/thesis-img.jpg';
import thesisPdf from '../assets/thesis.pdf';
import huskLogo from '../assets/husk-logo.png';
import huskHomeLight from '../assets/husk/home-en-light.webp';
import huskHomeDark from '../assets/husk/home-en-dark.webp';
import huskGrammarGerman from '../assets/husk/grammar-answer-de-light.webp';

// Projects with a slideshow; each also opens from a link to #<id>.
const stories = ['almsommer', 'husk'] as const;
type Story = (typeof stories)[number];

const storyFromHash = (): Story | null => stories.find((id) => window.location.hash === `#${id}`) ?? null;

function Projects() {
    const [openStory, setOpenStory] = useState<Story | null>(storyFromHash);

    useEffect(() => {
        const onHashChange = () => setOpenStory(storyFromHash());
        window.addEventListener('hashchange', onHashChange);
        return () => window.removeEventListener('hashchange', onHashChange);
    }, []);

    const showStory = (story: Story) => {
        history.replaceState(null, '', `#${story}`);
        setOpenStory(story);
    };

    const closeStory = () => {
        history.replaceState(null, '', window.location.pathname + window.location.search);
        setOpenStory(null);
    };

    return (
        <section id='projects' className='projects'>
            <h2 className="section-title">Projects</h2>
            <div className='projects-block'>

                <article className='card specific-project is-clickable' onClick={() => showStory('almsommer')}>
                    <img className="project-media" src={almsommerImage} alt="The Almsommer title screen: four illustrated shepherds on an alpine meadow at dusk" loading="lazy" />
                    <h3>Almsommer – Schafkopf Card Game</h3>
                    <p className="project-role">Solo project: concept, illustration, design and code</p>
                    <ul className='tag-list' aria-label="Technologies">
                        <li>React Native</li>
                        <li>Expo</li>
                        <li>Game AI</li>
                        <li>Illustration</li>
                    </ul>
                    <p>
                        The traditional Bavarian card game Schafkopf, played on an alpine meadow against three computer
                        opponents. My goal is to make my favourite card game accessible to people outside of Bavaria.
                    </p>
                    <p>
                        I made it entirely on my own: I wrote all of the code – the rules engine, the computer opponents and
                        the app for three platforms – illustrated the whole deck and every figure, and designed every screen.
                        A guided game with coach tips helps beginners learn the rules.
                    </p>
                    <p className="project-status">Coming soon to Google Play</p>
                    <div className="project-links">
                        <button type="button" className="button button-dark">
                            Discover the game
                        </button>
                        <a className="button button-outline" href={ALMSOMMER_URL} target="_blank" rel="noopener noreferrer" onClick={(event) => event.stopPropagation()}>
                            Play in the browser
                        </a>
                        <a className="button button-outline button-icon" href={ALMSOMMER_REPO_URL} target="_blank" rel="noopener noreferrer" onClick={(event) => event.stopPropagation()}>
                            <GithubIcon /> GitHub
                        </a>
                    </div>
                </article>
                <article className='card specific-project is-clickable' onClick={() => showStory('husk')}>
                    <div className="project-media husk-cover" role="img" aria-label="The Husk logo next to three screenshots of the app: dark mode, light mode in English, and a grammar drill in German">
                        <img className="husk-cover-logo" src={huskLogo} alt="" loading="lazy" />
                        <div className="husk-cover-phones">
                            <img src={huskHomeDark} alt="" loading="lazy" />
                            <img src={huskHomeLight} alt="" loading="lazy" />
                            <img src={huskGrammarGerman} alt="" loading="lazy" />
                        </div>
                    </div>
                    <h3>Husk – Danish Learning App</h3>
                    <p className="project-role">Solo project: concept, design and code</p>
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
                    <div className="project-links">
                        <button type="button" className="button button-dark">
                            Discover the app
                        </button>
                    </div>
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

            <AlmsommerStory open={openStory === 'almsommer'} onClose={closeStory} />
            <HuskStory open={openStory === 'husk'} onClose={closeStory} />
        </section>
    );
}

export default Projects;
