import SiteHeader from './components/SiteHeader';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import { ArrowDown } from './components/Icons';
import cv from './assets/about/CV.pdf';
import profilePicture from './assets/about/profile-picture.webp';

const principles = [
    { title: 'Make it work', text: 'A working prototype early, so the idea can be tested on a real device.' },
    { title: 'Make it clear', text: 'Clear structure, readable type, an obvious next step on every screen.' },
    { title: 'Make it beautiful', text: 'My graphic design background: typography, colour and the details.' },
];

function App() {
    return (
        <>
            <SiteHeader page="home" />
            <main id="top">
                <section className="container hero" aria-labelledby="hero-title">
                    <div className="hero-text">
                        <p className="status-chip">Open to developer roles · Copenhagen &amp; remote</p>
                        <h1 id="hero-title" className="display hero-title">I build apps and games – from first idea to release.</h1>
                        <p className="lead hero-lead">Software developer in Copenhagen working with React Native, TypeScript and Unity.</p>
                        <div className="button-row">
                            <a className="btn btn--primary" href="#work">See my projects <ArrowDown size={18} /></a>
                            <a className="btn btn--secondary" href={cv} target="_blank" rel="noopener noreferrer">Download CV</a>
                        </div>
                    </div>
                    <div className="hero-side">
                        <img className="hero-portrait" src={profilePicture} width={480} height={646} alt="Portrait of Maria Thurn" />
                        <ul className="hero-facts" aria-label="Quick facts">
                            <li>MSc IT &amp; Cognition · KU</li>
                            <li>BA Design · TH Nürnberg</li>
                            <li>DE · EN · DA (B1)</li>
                        </ul>
                    </div>
                </section>

                <Projects />

                <section className="band" aria-labelledby="how-title">
                    <div className="container band-inner">
                        <h2 id="how-title" className="h2">How I work</h2>
                        <ol className="principles">
                            {principles.map((item, i) => (
                                <li key={item.title}>
                                    <span className="number">{String(i + 1).padStart(2, '0')}</span>
                                    <h3 className="principle-title">{item.title}</h3>
                                    <p className="text-secondary">{item.text}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                <About />
            </main>
            <Contact />
        </>
    );
}

export default App;
