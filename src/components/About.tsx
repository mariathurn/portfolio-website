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
            I love learning and building things that people enjoy using.
            During my MSc in IT & Cognition, I discovered a passion for frontend development,
            where technology, creativity, and user experience come together.
            <br /><br />
            I’m currently looking for my first frontend developer role,
            where I can grow as a developer, contribute to meaningful projects,
            and continue learning every day.
          </p><br />
          <p>Click CV for more information.</p>
        </article>

      </div>
    </section>
  );
}

export default About;