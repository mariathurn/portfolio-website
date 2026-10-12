import '../styles/Skills.css';

const skills = [
    {
        title: 'Frontend',
        text: [
            'I build responsive and accessible web applications with a focus on clean UI, usability, and performance.',
            'I enjoy turning designs into interactive web experiences using modern technologies.',
        ],
        tools: ['React', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Responsive Design'],
    },
    {
        title: 'Design',
        text: [
            'With a Bachelor’s degree in Graphic Design and a Master’s degree in IT & Cognition, I combine creative ideas with strong technical skills.',
            'I enjoy designing products that are both intuitive and visually engaging.',
        ],
        tools: ['Figma', 'Adobe Creative Cloud', 'UI Design', 'Graphic Design', 'Prototyping', 'UX'],
    },
    {
        title: 'Software Development',
        text: [
            'I have experience working across the full development workflow, from programming and version control to APIs and debugging.',
            'I’m always learning new tools and technologies to expand my skill set.',
        ],
        tools: ['Python', 'C#', 'Node.js', 'Express', 'REST APIs', 'Git', 'GitHub'],
    },
    {
        title: 'Artificial Intelligence',
        text: [
            'During my Master’s research I fine-tuned and evaluated transformer models in Python and used explainability methods to understand their predictions.',
            'My interest lies in how new tools and technologies can be applied to real-world projects.',
        ],
        tools: ['Python', 'Transformers (XLM-R, mT5)', 'NLP', 'Fine-tuning', 'SHAP', 'Integrated Gradients'],
    },
];

function Skills() {
    return (
        <section id='skills' className='skills'>
            <h2 className="section-title">Skills</h2>
            <div className='skills-block'>
                {skills.map((skill) => (
                    <article key={skill.title} className='card specific-skill'>
                        <h3>{skill.title}</h3>
                        {skill.text.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                        <ul className='tag-list' aria-label={`${skill.title} tools`}>
                            {skill.tools.map((tool) => <li key={tool}>{tool}</li>)}
                        </ul>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default Skills;
