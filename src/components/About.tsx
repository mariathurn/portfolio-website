const skillGroups = [
    { title: 'Apps & frontend', skills: 'React, React Native, Expo, TypeScript, REST APIs, HTML/CSS' },
    { title: 'Design', skills: 'Figma, UI design, typography, illustration, 3D visualisation' },
    { title: 'Software & AI', skills: 'Python, C#, Unity, Git, NLP, transformer models' },
];

const experience = [
    { years: '2025–26', role: 'Programming Teaching Assistant', company: 'University of Copenhagen' },
    { years: '2021–23', role: 'Technical Support', company: 'Mercedes-Benz CSC' },
    { years: '2019–20', role: '3D Visualisation Designer', company: 'Siemens Healthineers' },
    { years: '2017–18', role: '3D Design Intern', company: 'Adidas, Digital Creation' },
];

function About() {
    return (
        <section id="about" className="container section about" aria-labelledby="about-title">
            <div className="about-text">
                <h2 id="about-title" className="h2">About</h2>
                <p className="text-secondary measure">
                    I studied graphic design (BA, TH Nürnberg) and IT &amp; Cognition (MSc, University of Copenhagen).
                    Before moving into software, I worked in 3D design at Adidas and Siemens Healthineers and in
                    technical support at Mercedes-Benz. Originally from Bavaria, now in Copenhagen.
                </p>
                <div className="skill-groups">
                    {skillGroups.map((group) => (
                        <div key={group.title}>
                            <h3 className="label">{group.title}</h3>
                            <p className="text-small">{group.skills}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="experience">
                <h3 className="label">Experience</h3>
                <ul className="experience-list">
                    {experience.map((item) => (
                        <li key={item.years}>
                            <span className="experience-years">{item.years}</span>
                            <div>
                                <p className="experience-role">{item.role}</p>
                                <p className="experience-company">{item.company}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default About;
