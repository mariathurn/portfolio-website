import '../styles/CharacterSheet.css';
import PixelPortrait from './PixelPortrait';

// Edit freely – everything shown on the sheet lives in these lists.
const details = [
    { label: 'Class', value: 'Software Developer' },
    { label: 'Subclass', value: 'Tech Wizard' },
    { label: 'Origin', value: 'Bavaria' },
];

const abilities = [
    { name: 'Design Eye', score: 18, note: 'Spots a misaligned pixel from across the room' },
    { name: 'Code', score: 15, note: 'React, TypeScript & a healthy fear of CSS z-index' },
    { name: 'Curiosity', score: 17, note: 'From graphic design to transformer models' },
    { name: 'Debugging', score: 14, note: '+2 when armed with AI pet' },
    { name: 'Teamwork', score: 16, note: 'Speaks fluent Designer and Developer' },
    { name: 'Card Games', score: 20, note: 'Natural 20. Will teach you.' },
];

const traits = [
    { label: 'Personality', text: 'Can be stubborn while finishing a goal. Might require frequent focus potions.' },
    { label: 'Ideal', text: 'Beauty. Interfaces should be both beautiful and easy to use.' },
    { label: 'Bond', text: 'Loves her 1000 different hobbies and her 2 cats.' },
    { label: 'Flaw', text: 'Will notice your kerning.' },
];

const inventory = ['Macbook Air', 'VS Code', 'A deck of Bavarian playing cards', 'An ever-growing danish vocabulary', 'Donuts (for defense)'];

function CharacterSheet() {
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
                        <div key={ability.name} className="ability">
                            <span className="sheet-label ability-name">{ability.name}</span>
                            <span className="ability-score">{ability.score}</span>
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

                    <div className="sheet-box">
                        <h3 className="sheet-box-title">Inventory</h3>
                        <ul className="sheet-inventory">
                            {inventory.map((item) => <li key={item}>{item}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default CharacterSheet;
