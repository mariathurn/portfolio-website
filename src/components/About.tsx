import '../styles/About.css';
import profilePicture from '../assets/profile-picture.jpeg'
import cv from '../assets/CV.pdf'
import SpeechBubble from './SpeechBubble';
import CharacterSheet from './CharacterSheet';
import GithubIcon from './GithubIcon';
import { GITHUB_URL } from '../links';

function About() {
  return (
    <section id="about" className="about">
      <div className='about-block'>
        <img className="profile-picture" src={profilePicture} alt="Portrait of Maria Thurn" />
        <article className='text-block'>
          <h1 className="section-title">Hej, I'm Maria!</h1>
          <SpeechBubble className="about-lead">
            {/* Terminal look: prompt in front, blinking cursor at the end; &nbsp; keeps the last two words together */}
            <span className="prompt" aria-hidden="true">&gt; </span>
            I'm a software developer with a background in graphic&nbsp;design. I build products that are both beautiful and easy to&nbsp;use.
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
                <GithubIcon /> GitHub
              </a>
            </li>
            <li>
              <a className="link-chip" href={cv} target="_blank" rel="noopener noreferrer">
                <span aria-hidden="true">📄</span> Open CV
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
