import { useEffect, useState, type CSSProperties } from 'react';
import '../styles/About.css';
import welcomeBanner from '../assets/welcome-banner.png'
import profilePicture from '../assets/profile-picture.jpeg'
import cv from '../assets/CV.pdf'
import NyanCat from './NyanCat';
import SpeechBubble from './SpeechBubble';
import { BANNER_DONE_EVENT } from '../events';
import CharacterSheet from './CharacterSheet';
import { GITHUB_URL } from '../links';

// Banner intro: fade in, cat flies through and wipes it away, then the space collapses.
// Shown only on a visitor's first visit.
const INTRO_MS = 1000;
const CAT_MS = 1500;
const COLLAPSE_MS = 500;
const BANNER_SEEN_KEY = 'banner-seen';

type BannerPhase = 'intro' | 'cat' | 'collapse' | 'gone';

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const bannerSeen = () => {
  try {
    return localStorage.getItem(BANNER_SEEN_KEY) !== null;
  } catch {
    return false;
  }
};

const skipBanner = () => prefersReducedMotion() || bannerSeen();

function About() {
  const [phase, setPhase] = useState<BannerPhase>(() => (skipBanner() ? 'gone' : 'intro'));

  // Tell the dark-mode lever that the intro is over, so it can show its hint
  useEffect(() => {
    if (phase === 'gone') window.dispatchEvent(new Event(BANNER_DONE_EVENT));
  }, [phase]);

  useEffect(() => {
    if (skipBanner()) return;
    try {
      localStorage.setItem(BANNER_SEEN_KEY, 'true');
    } catch {
      // Storage can be blocked (private mode) – the banner then just plays again next time
    }

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
          <SpeechBubble className="about-lead">
            {/* Terminal look: prompt in front, blinking cursor at the end; &nbsp; keeps the last two words together */}
            <span className="prompt" aria-hidden="true">&gt; </span>
            I'm a software developer with a background in graphic&nbsp;design. I build apps that are both beautiful and easy to&nbsp;use.
            <span className="cursor" aria-hidden="true" />
          </SpeechBubble>

          <ul className="about-facts" aria-label="Quick facts">
            <li><span aria-hidden="true">📍</span> Copenhagen</li>
            <li><span aria-hidden="true">🎓</span> MSc IT &amp; Cognition</li> {/*https://www.ku.dk/studies/masters/it-and-cognition*/}
            <li><span aria-hidden="true">🎨</span> BA Graphic Design</li>          {/*   https://www.artstation.com/mariathurn */}
          </ul>

          <ul className="about-facts about-links" aria-label="Links">
            <li>
              <a className="link-chip" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                <svg className="github-icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
                  <path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg> GitHub
              </a>
            </li>
            <li>
              <a className="link-chip" href={cv} target="_blank" rel="noopener noreferrer">
                <span aria-hidden="true">📄</span> Download CV <span aria-hidden="true">↓</span>
              </a>
            </li>
          </ul>
        </article>
      </div>

      <CharacterSheet />
    </section>
  );
}

export default About;
