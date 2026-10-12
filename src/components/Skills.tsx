import { useCallback, useState } from 'react';
import '../styles/Skills.css';
import SkillRunner from './SkillRunner';
import { categories, skills, type Skill } from '../data/skills';

function Skills() {
    // Names of skills collected in the game, newest first
    const [collected, setCollected] = useState<string[]>([]);

    const collect = useCallback((skill: Skill) => {
        setCollected((prev) => (prev.includes(skill.name) ? prev : [skill.name, ...prev]));
    }, []);
    const restart = useCallback(() => setCollected([]), []);

    return (
        <section id='skills' className='skills'>
            <h2 className="section-title">Skills</h2>

            <SkillRunner collected={collected} onCollect={collect} onRestart={restart} />

            {/* Quick overview for anyone who doesn't want to play */}
            <div className="skill-overview">
                {categories.map((category) => (
                    <table key={category.id} className="skill-table">
                        <caption>
                            <span className="skill-swatch" style={{ backgroundColor: category.color }} aria-hidden="true" />
                            {category.label}
                        </caption>
                        <tbody>
                            {skills.filter((skill) => skill.category === category.id).map((skill) => {
                                const isCollected = collected.includes(skill.name);
                                return (
                                    <tr key={skill.name} className={isCollected ? 'is-collected' : ''}>
                                        <th scope="row">
                                            {skill.name}
                                            {isCollected && <span className="skill-check" aria-label="collected"> ✓</span>}
                                        </th>
                                        <td>{skill.blurb}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ))}
            </div>
        </section>
    );
}

export default Skills;
