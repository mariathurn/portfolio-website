import { useCallback, useState } from 'react';
import '../styles/Skills.css';
import SkillRunner from './SkillRunner';
import { categories, skills, type Skill } from '../data/skills';

function Skills() {
    // Names of collected skills, newest first
    const [collected, setCollected] = useState<string[]>([]);

    const collect = useCallback((skill: Skill) => {
        setCollected((prev) => (prev.includes(skill.name) ? prev : [skill.name, ...prev]));
    }, []);
    const restart = useCallback(() => setCollected([]), []);
    const fillAll = () => setCollected(skills.map((skill) => skill.name));

    const latest = skills.find((skill) => skill.name === collected[0]);
    const allCollected = collected.length === skills.length;

    return (
        <section id='skills' className='skills'>
            <h2 className="section-title">Skills</h2>

            <SkillRunner collected={collected} onCollect={collect} onRestart={restart} />

            <div className="skill-stats">
                <ul className="skill-bars" aria-label="Skill levels">
                    {categories.map((category) => {
                        const total = skills.filter((s) => s.category === category.id).length;
                        const count = skills.filter((s) => s.category === category.id && collected.includes(s.name)).length;
                        return (
                            <li key={category.id} className={count === total ? 'is-full' : ''}>
                                <div className="skill-bar-label">
                                    <span>{category.label}</span>
                                    <span>{count === total ? 'MAX' : `${count} / ${total}`}</span>
                                </div>
                                <div className="skill-bar-track" role="progressbar" aria-label={category.label}
                                    aria-valuemin={0} aria-valuemax={total} aria-valuenow={count}>
                                    <div className="skill-bar-fill"
                                        style={{ width: `${(count / total) * 100}%`, backgroundColor: category.color }} />
                                </div>
                            </li>
                        );
                    })}
                </ul>

                <div className="skill-latest" aria-live="polite">
                    {latest ? (
                        <p><strong>{latest.name}</strong> – {latest.blurb}</p>
                    ) : (
                        <p className="skill-latest-empty">Collect the bubbles to fill up the bars.</p>
                    )}
                    {!allCollected && (
                        <button type="button" className="skill-skip" onClick={fillAll}>
                            No time to play? Fill all bars
                        </button>
                    )}
                </div>
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
