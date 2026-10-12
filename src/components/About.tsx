import '../styles/About.css';
import welcomeBanner from '../assets/welcome-banner.png'
import profilePicture from '../assets/profile-picture.jpeg'
import cv from '../assets/CV.pdf'

function About() {
  return (
    <section id="about" className="about">
      <img className="welcome-banner" src={welcomeBanner} alt="" />

      <div className='about-block'>
        <img className="profile-picture" src={profilePicture} alt="Portrait of Maria Thurn" />
        <article className='text-block'>
          <h1 className="section-title">Hej, I'm Maria !</h1>
          <p>
            I'm Maria Thurn, a frontend developer with a background in graphic design and a Master's degree in IT &amp; Cognition
            from the University of Copenhagen. I build interfaces that look good and work well – combining an eye
            for design with real enthusiasm for technical challenges.
          </p>
          <p>
            I recently graduated and I'm looking for my first frontend developer role, where I can keep growing
            as a developer and contribute to meaningful products.
          </p>
          <a className="button button-primary cv-button" href={cv} target="_blank" rel="noopener noreferrer">
            Download CV (PDF)
          </a>
        </article>
      </div>
    </section>
  );
}

export default About;
