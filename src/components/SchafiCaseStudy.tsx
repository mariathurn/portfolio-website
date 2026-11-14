import SiteHeader from './SiteHeader';
import { SiteFooter } from './Contact';
import { ArrowRight, ExternalArrow } from './Icons';
import { SCHAFI_PLAY_URL } from '../links';
import menuPhone from '../assets/schafi/menu-phone.webp';
import gamePhone from '../assets/schafi/game-phone.webp';
import onlinePhone from '../assets/schafi/online-phone.webp';
import desktop from '../assets/schafi/desktop.webp';
import phoneGame from '../assets/schafi/phone-game.webp';

const sections = [
    { id: 'problem', title: 'Problem' },
    { id: 'goal', title: 'Goal' },
    { id: 'process', title: 'Process' },
    { id: 'decisions', title: 'Key decisions' },
    { id: 'outcome', title: 'Outcome' },
];

const steps = [
    {
        title: 'From Almsommer to Schafi',
        text: 'Schafi grew out of Almsommer, my first version of the game: offline, against the computer, with a deck I illustrated myself. Schafi builds on its rules engine, switches to the classic Bavarian deck and turns it into an online game.',
    },
    {
        title: 'Rules engine',
        text: 'Sauspiel, Solo, Wenz, Hochzeit and Ramsch when everybody passes, plus Geier, Farbgeier and Farbwenz as house rules, with the short or the long deck. The engine decides which cards are legal on every move; the others are greyed out, so there are no error messages.',
    },
    {
        title: 'Computer players that think ahead',
        text: 'A computer player knows only its own hand and the cards played so far. It imagines many deals of the unknown cards that fit what it knows, plays each of its cards through to the end on every one and picks the card that wins most on average. Three levels: 14 imagined deals per card on medium, 48 on hard.',
    },
    {
        title: 'Online game server',
        text: 'A Colyseus server on Fly.io runs every table. Quick match at open tables with your own house rules, or a private Stammtisch shared by a five-letter code. Accounts, friends and the game’s coins live in Supabase.',
    },
    {
        title: 'Guided first game and tutorials',
        text: 'A guided first game gives a tip for every move. Short lessons then cover the basics, Sauspiel, Solo, Wenz, Hochzeit and Ramsch, and a daily task with a coin reward brings players back.',
    },
];

const decisions = [
    {
        title: 'Learn by playing',
        text: 'Rules are taught in context, with a tip for every move of the first game, not in a manual up front.',
    },
    {
        title: 'The server decides',
        text: 'Every move is checked on the server and hidden hands never leave it, so nobody can cheat by reading network traffic.',
    },
    {
        title: 'Tap twice to play',
        text: 'On phones the table has its own portrait layout, and a card is played with a second tap, so you can’t play the wrong one by accident.',
    },
];

function SchafiCaseStudy() {
    return (
        <>
            <SiteHeader page="sub" />
            <main>
                <section className="container case-intro" aria-labelledby="case-title">
                    <p className="label label--accent">Case study · Solo project</p>
                    <h1 id="case-title" className="case-title">Schafi – Schafkopf for everyone</h1>
                    <p className="case-lead">
                        Schafkopf, the Bavarian card game, for Android, iOS and the web: online with friends or at an open
                        table, or against three computer opponents that think ahead.
                    </p>
                    <dl className="facts case-facts">
                        <div><dt className="label">Role</dt><dd>Concept, design, code and game server</dd></div>
                        <div><dt className="label">Tools</dt><dd>React Native, Expo, Colyseus, Supabase</dd></div>
                        {/* TODO(Maria): Zeitraum inkl. Almsommer prüfen */}
                        <div><dt className="label">Timeline</dt><dd>2026</dd></div>
                        <div><dt className="label">Status</dt><dd>Coming soon to the App Store and Google Play</dd></div>
                    </dl>
                    <div className="button-row">
                        <a className="btn btn--primary" href={SCHAFI_PLAY_URL} target="_blank" rel="noopener noreferrer">Play in the browser <ExternalArrow /></a>
                    </div>
                </section>

                <div className="container">
                    <div className="case-hero">
                        <img src={menuPhone} width={600} height={1338} alt="The menu on a phone: daily task, the four Obers, Play online and Play the computer" />
                        <img src={gamePhone} width={600} height={1338} alt="A trick in progress on a phone" />
                        <img src={onlinePhone} width={600} height={1232} alt="Playing online on a phone: looking for players, private tables and open tables" />
                    </div>
                </div>

                <div className="container case-body">
                    <nav className="case-toc" aria-label="On this page">
                        <p className="label">On this page</p>
                        {sections.map((section) => (
                            <a key={section.id} href={`#${section.id}`}>{section.title}</a>
                        ))}
                    </nav>

                    <article className="case-article">
                        <section id="problem" aria-labelledby="h-problem">
                            <h2 id="h-problem" className="h3-lg">The problem</h2>
                            {/* TODO(Maria): in eigenen Worten – was macht das Lernen schwer, wen hast du dabei beobachtet? */}
                            <p>
                                Schafkopf is Bavaria’s favourite card game, but it is hard to learn without someone who
                                already plays. And you need four players at one table.
                            </p>
                        </section>

                        <section id="goal" aria-labelledby="h-goal">
                            <h2 id="h-goal" className="h3-lg">The goal</h2>
                            <p>
                                Make my favourite card game easier to learn for people outside Bavaria, and make sure there
                                is always a table: with friends online, with strangers at an open table, or with the computer.
                            </p>
                        </section>

                        <section id="process" aria-labelledby="h-process">
                            <h2 id="h-process" className="h3-lg">Process</h2>
                            <ol className="steps">
                                {steps.map((step, i) => (
                                    <li key={step.title}>
                                        <span className="number">{String(i + 1).padStart(2, '0')}</span>
                                        <div>
                                            <h3 className="step-title">{step.title}</h3>
                                            <p className="text-small">{step.text}</p>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                            <figure className="case-figure">
                                <div className="case-shots">
                                    <img src={desktop} width={1600} height={905} loading="lazy" alt="The game table on a wide screen: Eichel-Solo, four players around a green table" />
                                    <img src={phoneGame} width={600} height={1221} loading="lazy" alt="The same game in the portrait layout for phones" />
                                </div>
                                <figcaption className="caption">One table, two layouts: it scales like a browser game, with its own portrait layout for phones.</figcaption>
                            </figure>
                        </section>

                        <section id="decisions" aria-labelledby="h-decisions">
                            <h2 id="h-decisions" className="h3-lg">Key decisions</h2>
                            <div className="decision-grid">
                                {decisions.map((decision) => (
                                    <div key={decision.title} className="decision">
                                        <h3 className="step-title">{decision.title}</h3>
                                        <p className="text-small">{decision.text}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section id="outcome" aria-labelledby="h-outcome">
                            <h2 id="h-outcome" className="h3-lg">Outcome &amp; next steps</h2>
                            <p>
                                One Expo / React Native codebase runs on Android, iOS and the web, with 160 unit tests for
                                the rules, the computer players, scoring, house rules and the server game. The release in the
                                App Store and on Google Play is coming soon; until then you can play in the browser.
                            </p>
                            {/* TODO(Maria): nach dem Launch – Downloads, Bewertungen, Feedback; eigenes Fazit in 1–2 Sätzen */}
                        </section>
                    </article>
                </div>

                <section className="next-project" aria-label="Next project">
                    <a className="container next-project-link" href="/#husk">
                        <span>
                            <span className="label">Next project</span>
                            <span className="next-project-title">Husk – learn Danish</span>
                        </span>
                        <ArrowRight size={32} />
                    </a>
                </section>
            </main>
            <SiteFooter />
        </>
    );
}

export default SchafiCaseStudy;
