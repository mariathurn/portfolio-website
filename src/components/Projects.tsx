import { useEffect, useState } from 'react';
import '../styles/Projects.css';
import AlmsommerStory, { ALMSOMMER_URL } from './AlmsommerStory';
import almsommerImage from '../assets/almsommer.jpg';
import donutImage from '../assets/donut.jpg';
import thesisImage from '../assets/thesis-img.jpg';
import thesisPdf from '../assets/thesis.pdf';
import huskLogo from '../assets/husk-logo.png';

const STORY_HASH = '#almsommer';

function Projects() {
    // The Almsommer slideshow also opens from a link to #almsommer.
    const [storyOpen, setStoryOpen] = useState(() => window.location.hash === STORY_HASH);

    useEffect(() => {
        const onHashChange = () => setStoryOpen(window.location.hash === STORY_HASH);
        window.addEventListener('hashchange', onHashChange);
        return () => window.removeEventListener('hashchange', onHashChange);
    }, []);

    const openStory = () => {
        history.replaceState(null, '', STORY_HASH);
        setStoryOpen(true);
    };

    const closeStory = () => {
        history.replaceState(null, '', window.location.pathname + window.location.search);
        setStoryOpen(false);
    };

    return (
        <section id='projects' className='projects'>
            <h2 className="section-title">Projects</h2>
            <div className='projects-block'>

                <article className='card specific-project is-clickable' onClick={openStory}>
                    <img className="project-media" src={almsommerImage} alt="The Almsommer title screen: four illustrated shepherds on an alpine meadow at dusk" loading="lazy" />
                    <h3>Almsommer – Schafkopf Card Game</h3>
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
                        I redesigned and illustrated the whole deck and added helpful information to the cards, and a guided
                        game with coach tips helps beginners learn the rules – so I have more people to play with in Denmark.
                    </p>
                    <p className="project-status">Coming soon to Google Play</p>
                    <div className="project-links">
                        <button type="button" className="button button-dark">
                            Discover the game
                        </button>
                        <a className="button button-outline" href={ALMSOMMER_URL} target="_blank" rel="noopener noreferrer" onClick={(event) => event.stopPropagation()}>
                            Play in the browser
                        </a>
                    </div>
                </article>
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

            <AlmsommerStory open={storyOpen} onClose={closeStory} />
        </section>
    );
}

export default Projects;
