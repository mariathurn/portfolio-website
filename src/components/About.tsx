import { useEffect, useState, type CSSProperties } from 'react';
import '../styles/About.css';
import welcomeBanner from '../assets/welcome-banner.png'
import profilePicture from '../assets/profile-picture.jpeg'
import cv from '../assets/CV.pdf'
import NyanCat from './NyanCat';
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
            I'm a graphic designer who learned to code – and never stopped.
            Now I build interfaces that look good <em>and</em> work well.
          </p>
          <p className="about-lead about-status">
            Fresh out of my Master's in IT &amp; Cognition at the University of Copenhagen – ready to bring design and code together.
          </p>

          <ul className="about-facts" aria-label="Quick facts">
            <li><span aria-hidden="true">📍</span> Copenhagen</li>
            <li><span aria-hidden="true">🎓</span> MSc IT &amp; Cognition</li>
            <li><span aria-hidden="true">🎨</span> BA Graphic Design</li>
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
