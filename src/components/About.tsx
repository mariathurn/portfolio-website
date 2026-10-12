import '../styles/About.css';
import welcomeBanner from '../assets/welcome-banner.png'
import profilePicture from '../assets/profile-picture.jpeg'
import cv from '../assets/CV.pdf'

function About() {
  return (
    <section id="about" className="about">
      <header className="hero">
        <img className="welcome-banner" src={welcomeBanner} alt="" />
        <h1 className="hero-name">Maria Thurn</h1>
        <p className="hero-role">Frontend Developer · UI Designer · Copenhagen</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#projects">View projects</a>
          <a className="button button-secondary" href={cv} target="_blank" rel="noopener noreferrer">
            Download CV (PDF)
          </a>
        </div>
      </header>

      <div className='about-block'>
        <img className="profile-picture" src={profilePicture} alt="Portrait of Maria Thurn" />
        <article className='text-block'>
          <h2 className="section-title">About</h2>
          <p>
            I'm a frontend developer with a background in graphic design and a Master's degree in IT &amp; Cognition
            from the University of Copenhagen. I build interfaces that look good and work well – combining an eye
            for design with real enthusiasm for technical challenges.
          </p>
          <p>
            I recently graduated and I'm looking for my first frontend developer role, where I can keep growing
            as a developer and contribute to meaningful products.
          </p>
        </article>
      </div>
    </section>
  );
}

export default About;
