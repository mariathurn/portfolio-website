import { useEffect, useState } from 'react';
import HuskStory from './HuskStory';
import AlmsommerStory from './AlmsommerStory';
import { ArrowRight, ExternalArrow } from './Icons';
import { SCHAFI_URL } from '../links';
import schafiBrowser from '../assets/schafi/play-browser.webp';
import schafiPhone from '../assets/schafi/game-phone.webp';
import huskHomeLight from '../assets/husk/home-en-light.webp';
import huskHomeDark from '../assets/husk/home-en-dark.webp';
import almsommerImage from '../assets/almsommer/menu-landscape.webp';
import donutImage from '../assets/donut-wars/cover.webp';
import thesisImage from '../assets/thesis/cover.webp';
import thesisPdf from '../assets/thesis/thesis.pdf';

// Projects with a slideshow; each also opens from a link to /#<id>
const stories = ['husk', 'almsommer'] as const;
type Story = (typeof stories)[number];

const storyFromHash = (): Story | null => stories.find((id) => window.location.hash === `#${id}`) ?? null;

function Projects() {
    const [openStory, setOpenStory] = useState<Story | null>(storyFromHash);

    useEffect(() => {
        const onHashChange = () => setOpenStory(storyFromHash());
        window.addEventListener('hashchange', onHashChange);
        return () => window.removeEventListener('hashchange', onHashChange);
    }, []);

    const closeStory = () => {
        history.replaceState(null, '', window.location.pathname + window.location.search);
        setOpenStory(null);
    };

    return (
        <section id="work" className="container section work" aria-labelledby="work-title">
            <div className="section-head">
                <h2 id="work-title" className="h2">Selected work</h2>
                <p className="meta">5 projects · 2025–2026</p>
            </div>

            <article className="card card--featured" aria-labelledby="schafi-title">
                <div className="card__media schafi-cover">
                    <img src={schafiBrowser} width={1600} height={1095} alt="A Sauspiel in the browser: three opponents, the trick in the middle, your hand below" />
                    <img className="schafi-cover-phone" src={schafiPhone} width={600} height={1338} alt="A trick in progress on a phone" />
                </div>
                <div className="card__body">
                    <p className="label label--accent">Featured · Solo project</p>
                    <h3 id="schafi-title" className="h3-lg">Schafi – Schafkopf for everyone</h3>
                    <p className="text-secondary">
                        The Bavarian card game for Android, iOS and the web. Play online with friends at your own
                        Stammtisch, join an open table, or play three computer opponents that think ahead. A guided
                        first game teaches the rules.
                    </p>
                    <dl className="facts facts--card">
                        <div><dt className="label">Role</dt><dd>Concept, design, code and game server</dd></div>
                        <div><dt className="label">Status</dt><dd>Coming soon to the App Store and Google Play</dd></div>
                        <div className="facts-wide"><dt className="label">Stack</dt><dd>React Native · Expo · Colyseus · Supabase · Game AI</dd></div>
                    </dl>
                    <div className="button-row card-actions">
                        <a className="btn btn--primary btn--sm" href="/work/schafi/">Read case study</a>
                        <a className="btn btn--secondary btn--sm" href={SCHAFI_URL} target="_blank" rel="noopener noreferrer">schafi.app <ExternalArrow /></a>
                    </div>
                </div>
            </article>

            <div className="project-grid">
                <article className="card" aria-labelledby="husk-title">
                    <div className="card__media husk-media">
                        <img src={huskHomeLight} width={540} height={1170} loading="lazy" alt="The Husk home screen in light mode: cards due in both directions and a forecast of the coming week" />
                        <img src={huskHomeDark} width={540} height={1170} loading="lazy" alt="The same home screen in dark mode" />
                    </div>
                    <div className="card__body">
                        <p className="label">Mobile app · In development</p>
                        <h3 id="husk-title" className="h3">Husk – learn Danish</h3>
                        <p className="text-small">Offline-first vocabulary app with FSRS spaced repetition, CEFR lessons A1–B1, pronunciation audio and grammar drills.</p>
                        <ul className="tag-list" aria-label="Technologies">
                            <li className="tag">React Native</li>
                            <li className="tag">TypeScript</li>
                            <li className="tag">SQLite</li>
                            <li className="tag">Supabase</li>
                        </ul>
                        <a className="link-arrow" href="#husk" onClick={() => setOpenStory('husk')}>Discover Husk <ArrowRight /></a>
                    </div>
                </article>

                <article className="card" aria-labelledby="almsommer-title">
                    <img className="card__media" src={almsommerImage} width={1440} height={829} loading="lazy" alt="The Almsommer title screen: four illustrated shepherds on an alpine meadow at dusk" />
                    <div className="card__body">
                        <p className="label">Illustration · Mobile &amp; web game</p>
                        <h3 id="almsommer-title" className="h3">Almsommer – an illustrated deck</h3>
                        <p className="text-small">The first version of my Schafkopf game. I illustrated all 24 cards and every figure, and designed a layout that adapts from an upright phone to a wide monitor.</p>
                        <ul className="tag-list" aria-label="Skills and technologies">
                            <li className="tag">Illustration</li>
                            <li className="tag">Card design</li>
                            <li className="tag">Responsive design</li>
                            <li className="tag">React Native</li>
                        </ul>
                        <a className="link-arrow" href="#almsommer" onClick={() => setOpenStory('almsommer')}>See the illustrations <ArrowRight /></a>
                    </div>
                </article>

                <article className="card" aria-labelledby="donut-title">
                    <img className="card__media" src={donutImage} width={1200} height={751} loading="lazy" alt="Screenshot of the game Donut Wars" />
                    <div className="card__body">
                        <p className="label">2D game · Playable online</p>
                        <h3 id="donut-title" className="h3">Donut Wars</h3>
                        <p className="text-small">Survival game: defend a bakery from hungry creatures by feeding them baked goods. Gameplay programming, game state and a playful visual style.</p>
                        <ul className="tag-list" aria-label="Technologies">
                            <li className="tag">Unity</li>
                            <li className="tag">C#</li>
                            <li className="tag">Game design</li>
                        </ul>
                        <a className="link-arrow" href="https://mariagamingcorner.itch.io/donut-wars" target="_blank" rel="noopener noreferrer">Play on itch.io <ExternalArrow /></a>
                    </div>
                </article>

                <article className="card" aria-labelledby="thesis-title">
                    <img className="card__media" src={thesisImage} width={1200} height={821} loading="lazy" alt="Visualisation from my master's thesis on multilingual named entity recognition" />
                    <div className="card__body">
                        <p className="label">Research · Master’s thesis</p>
                        <h3 id="thesis-title" className="h3">Multilingual NER</h3>
                        <p className="text-small">How multilingual transformers represent named entities in English, Dutch and Spanish. Fine-tuned XLM-R and mT5; analysed errors with attention, Integrated Gradients and SHAP.</p>
                        <ul className="tag-list" aria-label="Technologies">
                            <li className="tag">Python</li>
                            <li className="tag">Transformers</li>
                            <li className="tag">Explainable AI</li>
                        </ul>
                        <a className="link-arrow" href={thesisPdf} target="_blank" rel="noopener noreferrer">Read the thesis (PDF) <ExternalArrow /></a>
                    </div>
                </article>
            </div>

            <HuskStory open={openStory === 'husk'} onClose={closeStory} />
            <AlmsommerStory open={openStory === 'almsommer'} onClose={closeStory} />
        </section>
    );
}

export default Projects;
