import '../styles/Projects.css';
import schafkopfVideo from '../assets/schafkopf.mov';


function Projects() {
    return (
        <section id='projects' className='projects'>
            <h1>Projects</h1>
            <div className='projects-block'>
                <article className='specific-project'>
                    <h2>Master's Thesis – Multilingual NER</h2>
                    <img src="src/assets/thesis-img.png" alt="picture of my thesis" />
                    <p>I investigated how multilingual transformer models represent named entities across English, Dutch, and Spanish. I fine-tuned and compared XLM-R and mT5 models for named entity recognition and used attention visualisation, Integrated Gradients, and SHAP to analyse their predictions and errors.</p>
                    <a className="cv" href="src/assets/thesis.pdf" target="_blank">Click here for my Master Thesis</a>
                </article>
                <article className='specific-project'>
                    <h2>Donut Wars – Survival Game</h2>
                    <img src="src/assets/donut.png" alt="picture of my thesis" />
                    <p>I developed a 2D survival game in Unity where players defend a bakery from hungry creatures by feeding them baked goods. <br /> <br />  The project combines gameplay programming, player interaction, game-state management, and a fun visual experience with catchy music to create a playful and sligthly addictive gaming experience.</p>
                    <a className="link-game" href="https://mariagamingcorner.itch.io/donut-wars" target="_blank">
                        Play Donut Wars
                    </a>
                </article>
                <article className='specific-project'>
                    <h2>Schafkopf – Multiplayer Card Game</h2>
                    <video className="project-video" controls preload="metadata">
                        <source src={schafkopfVideo} type="video/mp4" />
                        Your browser does not support video playback.
                    </video>
                    <p>I am developing a digital version of the traditional Bavarian card game Schafkopf in React. <br /><br />
                        I want to make my favorite card game accessible to people outside of Bavaria.
                        For this  I redesigned the traditional cards by adding additional helpful information on them. I hope that beginners will pick it up easier and I have more people to play it with in Denmark.</p>
                    <p>Playable Demo coming soon!</p>

                </article>
            </div>
        </section>
    );
}

export default Projects;