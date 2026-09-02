import '../styles/About.css';
import welcomeBanner from '../assets/welcome-banner.png'
import profilePicture from '../assets/profile-picture.png'

function About() {
  return (
    <section id="about" className="about">
      <img className="welcome-banner" src={welcomeBanner} alt="Welcome Banner" />
      <div className='about-block'>
        <img className="profile-picture" src={profilePicture} alt="Profile Picture" />
        <article className='text-block'>
          <h1>About</h1>
          <p>
            Newly graduated Front-End Developer looking for a company that wants a passionate and dedicated developer. <br /> <br />
            While studying at Copenhagen University I discovered a passion for Frontend Development. In this area of programming I can combine my design talent with my enthusiasm for technical challenges.
            <br /><br />
            I’m currently looking for my first frontend developer role,
            where I can grow as a developer and contribute to meaningful projects.
          </p><br />
          <a className="cv" href="src/assets/CV.pdf" target="_blank">Click here for my CV.</a>
        </article>

      </div>
    </section>
  );
}

export default About;