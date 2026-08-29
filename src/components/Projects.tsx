import '../styles/Projects.css';

function Projects() {
    return (
        <section id='projects' className='projects'>
            <h1>Projects</h1>
            <div className='projects-block'>
                <article>
                    <h2>Master's Thesis – Multilingual NER</h2>
                    <p>I investigated how multilingual transformer models represent named entities across English, Dutch, and Spanish. I fine-tuned and compared XLM-R and mT5 models for named entity recognition and used attention visualisation, Integrated Gradients, and SHAP to analyse their predictions and errors.</p>
                </article>
                <article>
                    <h2>Donut Wars – Survival Game</h2>
                    <p>I developed a 2D survival game in Unity where players defend a bakery from hungry creatures by feeding them baked goods. The project combines gameplay programming, player interaction, game-state management, and visual feedback to create a playful and engaging experience.</p>
                    <a href="https://mariagamingcorner.itch.io/donut-wars" target="_blank">
                        Play Donut Wars
                    </a>
                </article>
                <article>
                    <h2>Schafkopf – Multiplayer Card Game</h2>
                    <p>I am developing a digital version of the traditional Bavarian card game Schafkopf, focusing on responsive UI, game logic, and an intuitive multiplayer experience. The project combines interactive frontend development with state management, card-game mechanics, and real-time gameplay.</p>

                </article>
            </div>
        </section>
    );
}

export default Projects;