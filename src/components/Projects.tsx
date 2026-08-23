import '../styles/Projects.css';

function Projects() {
    return (
        <section id='projects' className='projects'>
            <h1>Projects</h1>
            <div className='projects-block'>
                <article>
                    <h2>Project Responsive UI</h2>
                    <p>I build responsive, accessible web applications with a strong focus on clean UI, usability, and performance. I enjoy turning designs into interactive experiences using modern web technologies.</p>
                </article>
                <article>
                    <h2>Project UX Heavy</h2>
                    <p>With a background in IT & Cognition, I enjoy designing interfaces that are both intuitive and visually engaging. I create wireframes, prototypes, and user-centered designs before bringing them to life in code.</p>
                </article>
                <article>
                    <h2>Design Systems</h2>
                    <p>I have experience working across the full development workflow, from programming and version control to APIs and debugging. I’m always learning new tools and technologies to expand my skill set.</p>
                </article>
            </div>
        </section>
    );
}

export default Projects;