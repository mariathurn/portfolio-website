import '../styles/Skills.css';

function Skills() {
    return (
        <section id='skills' className='skills' style={{ backgroundColor: "#335F7A" }}>
            <h1>Skills</h1>
            <div className='skills-block'>
                <article className='specific-skill'>
                    <h2>Frontend</h2>
                    <p>I build responsive and accessible web applications with a focus on clean UI, usability, and performance. </p>
                    <p>I enjoy turning designs into interactive web experiences using modern technologies.</p>
                    <div className='skill-summary'>React • JavaScript • TypeScript • HTML • CSS • Responsive Design</div>
                </article>
                <article className='specific-skill'>
                    <h2>Design</h2>
                    <p>With a Bachelor’s degree in Graphic Design and a Master’s degree in IT & Cognition, I combine creative ideas with strong technical mastery.</p>
                    <p>I enjoy designing products that are both intuitive and visually engaging.</p>
                    <div className='skill-summary'>Figma  • Adobe Creative Cloud • UI Design • Graphic Design • Prototyping • UX</div>

                </article>
                <article className='specific-skill'>
                    <h2>Software Development</h2>
                    <p>I have experience working across the full development workflow, from programming and version control to APIs and debugging.</p>
                    <p> I’m always learning new tools and technologies to expand my skill set.</p>
                    <div className='skill-summary'>Python • C# • Node.js • Express • REST APIs • Git • GitHub • VS Code</div>
                </article>
                <article className='specific-skill'>
                    <h2>Artificial Intelligence</h2>
                    <p>I have experience across the development workflow, as well as hands-on experience with machine learning. During my research, I trained and evaluated machine learning models using Python. </p>
                    <p>
                        My interest lies in how new tools and technologies can be applied to real-world projects.
                    </p>
                    <div className='skill-summary'>Python • C# • Node.js • Express • REST APIs • Git • GitHub • VS Code</div>
                </article>
            </div>
        </section >
    );
}

export default Skills;