import { useCallback, useState } from 'react';
import '../styles/Skills.css';
import SkillBreakout from './SkillBreakout';
import { categories, categoryColor, skills, type Skill } from '../data/skills';

function Skills() {
    // Names of unlocked skills, newest first
    const [collected, setCollected] = useState<string[]>([]);

    const collect = useCallback((skill: Skill) => {
        setCollected((prev) => (prev.includes(skill.name) ? prev : [skill.name, ...prev]));
    }, []);

    const unlockAll = () => setCollected(skills.map((skill) => skill.name));
    const restart = useCallback(() => setCollected([]), []);

    const unlocked = collected
        .map((name) => skills.find((skill) => skill.name === name))
        .filter((skill): skill is Skill => Boolean(skill));
    const allUnlocked = collected.length === skills.length;

    return (
        <section id='skills' className='skills'>
            <h2 className="section-title">Skills</h2>

            <ul className="skill-legend" aria-label="Skill categories">
                {categories.map((category) => (
                    <li key={category.id}>
                        <span className="skill-swatch" style={{ backgroundColor: category.color }} aria-hidden="true" />
                        {category.label}
                    </li>
                ))}
            </ul>

            <div className="skills-game">
                <SkillBreakout collected={collected} onCollect={collect} onRestart={restart} />

                <aside className="skill-inventory" aria-label="Unlocked skills">
                    <div className="skill-inventory-header">
                        <h3>Unlocked</h3>
                        <span className="skill-count">{collected.length} / {skills.length}</span>
                    </div>

                    {unlocked.length === 0 ? (
                        <p className="skill-inventory-empty">Catch falling skills with the paddle – they’ll show up here.</p>
                    ) : (
                        <ul className="skill-inventory-list" aria-live="polite">
                            {unlocked.map((skill) => (
                                <li key={skill.name}>
                                    <span className="skill-swatch" style={{ backgroundColor: categoryColor(skill.category) }} aria-hidden="true" />
                                    <div>
                                        <strong>{skill.name}</strong>
                                        <p>{skill.blurb}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}

                    {!allUnlocked && (
                        <button type="button" className="skill-skip" onClick={unlockAll}>
                            No time to play? Unlock all skills
                        </button>
                    )}
                </aside>
            </div>

            {/* Full list for screen readers and search engines – the game itself is a canvas */}
            <ul className="visually-hidden">
                {skills.map((skill) => (
                    <li key={skill.name}>{skill.name}: {skill.blurb}</li>
                ))}
            </ul>
        </section>
    );
}

export default Skills;
