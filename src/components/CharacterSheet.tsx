import { useState, type CSSProperties, type ReactNode } from 'react';
import '../styles/CharacterSheet.css';
import PixelPortrait from './PixelPortrait';

// Edit freely – everything shown on the sheet lives in these lists.
const details = [
    { label: 'Class', value: 'Software Developer' },
    { label: 'Subclass', value: 'Tech Wizard' },
    { label: 'Origin', value: 'Bavaria' },
];

// Scores out of 20; the colour tints the score and its bar
const abilities = [
    { name: 'Design Eye', score: 18, color: '#d9584a', note: 'Spots a misaligned pixel from across the room' },
    { name: 'Code', score: 15, color: '#3b82b0', note: 'React, TypeScript and React Native – no spell scrolls needed' },
    { name: 'Curiosity', score: 17, color: '#8a6bd1', note: 'From graphic design to transformer models' },
    { name: 'Debugging', score: 14, color: '#3c9a5a', note: '+2 when armed with AI pet' },
    { name: 'Teamwork', score: 16, color: '#d4951c', note: 'Speaks fluent Designer and Developer' },
    { name: 'Card Games', score: 20, color: '#c4528a', note: 'Natural 20. Will teach you.' },
];

const traits = [
    { label: 'Personality', text: 'Turns “wouldn’t it be cool if…” into a working prototype by the weekend.' },
    { label: 'Ideal', text: 'Make it work, make it clear, then make it beautiful.' },
    { label: 'Bond', text: 'Two cats, too many hobbies, never enough time.' },
    { label: 'Flaw', text: 'No flaws.' },
];

const quests: { text: ReactNode; done: boolean }[] = [
    { text: 'BA in Graphic Design', done: true },
    { text: 'MSc in IT & Cognition', done: true },
    { text: 'Illustrate a whole deck of cards', done: true },
    { text: 'Join a team in Copenhagen', done: false },
    { text: 'Ship Almsommer to Google Play', done: false },
    { text: 'Release Husk for Android and iOS', done: false },
    { text: 'Learn Danish, ét ord ad gangen', done: false },
];

function CharacterSheet() {
    // Visitors can tick off the open quests (but not untick them); ticking all of them earns an "All done!"
    const [checked, setChecked] = useState(() => quests.map((quest) => quest.done));
    const allDone = checked.every(Boolean);
    const tick = (index: number) => setChecked((prev) => prev.map((value, i) => value || i === index));

    return (
        <article className="character-sheet" aria-labelledby="character-sheet-title">
            <header className="sheet-header">
                <div className="sheet-name">
                    <span className="sheet-label">Character name</span>
                    <h2 id="character-sheet-title">Maria Thurn</h2>
                </div>
                <dl className="sheet-details">
                    {details.map((detail) => (
                        <div key={detail.label}>
                            <dt className="sheet-label">{detail.label}</dt>
                            <dd>{detail.value}</dd>
                        </div>
                    ))}
                </dl>
                <div className="sheet-portrait">
                    <PixelPortrait />
                </div>
            </header>

            <div className="sheet-body">
                <div className="sheet-abilities" role="group" aria-label="Ability scores">
                    {abilities.map((ability) => (
                        <div key={ability.name} className="ability" style={{ '--ability-color': ability.color, '--ability-fill': ability.score / 20 } as CSSProperties}>
                            <div className="ability-head">
                                <span className="ability-name">{ability.name}</span>
                                <span className="ability-score">
                                    {ability.score}
                                    <span className="ability-max"> / 20</span>
                                </span>
                            </div>
                            <div className="ability-bar" aria-hidden="true" />
                            <p className="ability-note">{ability.note}</p>
                        </div>
                    ))}
                </div>

                <div className="sheet-side">
                    <div className="sheet-box">
                        <h3 className="sheet-box-title">Traits</h3>
                        <dl className="sheet-traits">
                            {traits.map((trait) => (
                                <div key={trait.label}>
                                    <dt className="sheet-label">{trait.label}</dt>
                                    <dd>{trait.text}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    <div className="sheet-box sheet-quest-box">
                        <h3 className="sheet-box-title">Quest log</h3>
                        <ul className="sheet-quests">
                            {quests.map((quest, i) => (
                                <li key={i}>
                                    <label>
                                        <input type="checkbox" className="visually-hidden" checked={checked[i]} disabled={checked[i]} onChange={() => tick(i)} />
                                        <span className="quest-mark" aria-hidden="true">✓</span>
                                        {quest.text}
                                    </label>
                                </li>
                            ))}
                        </ul>
                        <p className="quest-done" role="status">
                            {allDone && <span>All done! 🎉</span>}
                        </p>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default CharacterSheet;
