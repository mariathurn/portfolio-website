import '../styles/Skills.css';

function Skills() {
    return (
        <section id='skills' className='skills' style={{ backgroundColor: "#335F7A" }}>
            <h1>Skills</h1>
            <div className='skills-block'>
                <article>
                    <h2>Frontend</h2>
                    <p>I build responsive, accessible web applications with a strong focus on clean UI, usability, and performance. I enjoy turning designs into interactive experiences using modern web technologies.</p>
                    <div className='skill-summary'>React • JavaScript • TypeScript • HTML • CSS • Responsive Design</div>
                </article>
                <article>
                    <h2>Design</h2>
                    <p>With a background in IT & Cognition, I enjoy designing interfaces that are both intuitive and visually engaging. I create wireframes, prototypes, and user-centered designs before bringing them to life in code.</p>
                    <div className='skill-summary'>Figma • UI Design • Wireframing • Prototyping • UX</div>

                </article>
                <article>
                    <h2>Software Development</h2>
                    <p>I have experience working across the full development workflow, from programming and version control to APIs and debugging. I’m always learning new tools and technologies to expand my skill set.</p>
                    <div className='skill-summary'>Python • C# • Node.js • Express • REST APIs • Git • GitHub • VS Code</div>
                </article>
            </div>
        </section>
    );
}

export default Skills;