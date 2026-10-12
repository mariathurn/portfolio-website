import { useEffect, useState, type CSSProperties } from 'react';
import '../styles/About.css';
import welcomeBanner from '../assets/welcome-banner.png'
import profilePicture from '../assets/profile-picture.jpeg'
import cv from '../assets/CV.pdf'
import NyanCat from './NyanCat';
import { BANNER_DONE_EVENT } from '../events';
import CharacterSheet from './CharacterSheet';

// Banner intro: fade in, cat flies through and wipes it away, then the space collapses.
const INTRO_MS = 2400;
const CAT_MS = 2600;
const COLLAPSE_MS = 700;

type BannerPhase = 'intro' | 'cat' | 'collapse' | 'gone';

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function About() {
  const [phase, setPhase] = useState<BannerPhase>(() => (prefersReducedMotion() ? 'gone' : 'intro'));

  // Tell the dark-mode lever that the intro is over, so it can show its hint
  useEffect(() => {
    if (phase === 'gone') window.dispatchEvent(new Event(BANNER_DONE_EVENT));
  }, [phase]);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const timers = [
      setTimeout(() => setPhase('cat'), INTRO_MS),
      setTimeout(() => setPhase('collapse'), INTRO_MS + CAT_MS),
      setTimeout(() => setPhase('gone'), INTRO_MS + CAT_MS + COLLAPSE_MS),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const bannerTimings = {
    '--cat-duration': `${CAT_MS}ms`,
    '--collapse-duration': `${COLLAPSE_MS}ms`,
  } as CSSProperties;

  return (
    <section id="about" className="about">
      {phase !== 'gone' && (
        <div className={`banner-stage banner-${phase}`} style={bannerTimings} aria-hidden="true">
          <div className="banner-inner">
            <div className="banner-track">
              <img className="welcome-banner" src={welcomeBanner} alt="" />
              {phase !== 'intro' && (
                <div className="nyan-cat">
                  <div className="nyan-trail" />
                  <NyanCat />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className='about-block'>
        <img className="profile-picture" src={profilePicture} alt="Portrait of Maria Thurn" />
        <article className='text-block'>
          <h1 className="section-title">Hej, I'm Maria!</h1>
          <p className="about-lead">
            {/* One line per sentence – the font shrinks to fit (see .about-lead in About.css) */}
            <span>I'm a graphic designer who learned how to code.</span>{' '}
            <span>Now I build whatever comes to my mind.</span>
          </p>

          <ul className="about-facts" aria-label="Quick facts">
            <li><span aria-hidden="true">📍</span> Copenhagen</li>
            <li><span aria-hidden="true">🎓</span> MSc IT &amp; Cognition</li> {/*https://www.ku.dk/studies/masters/it-and-cognition*/}
            <li><span aria-hidden="true">🎨</span> BA Graphic Design</li>          {/*   https://www.artstation.com/mariathurn */}
          </ul>

          <a className="button button-primary cv-button" href={cv} target="_blank" rel="noopener noreferrer">
            Download CV (PDF)
          </a>
        </article>
      </div>

      <CharacterSheet />
    </section>
  );
}

export default About;
