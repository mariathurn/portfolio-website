import '../styles/CharacterSheet.css';

// Edit freely – everything shown on the sheet lives in these lists.
const details = [
    { label: 'Class', value: 'Frontend Developer' },
    { label: 'Subclass', value: 'UI Designer' },
    { label: 'Level', value: '1 – ready for the first quest' },
    { label: 'Origin', value: 'Bavaria → Copenhagen' },
    { label: 'Alignment', value: 'Chaotic Creative' },
];

const abilities = [
    { name: 'Design Eye', score: 18, note: 'Spots a misaligned pixel from across the room' },
    { name: 'Code', score: 15, note: 'React, TypeScript & a healthy fear of CSS z-index' },
    { name: 'Curiosity', score: 17, note: 'From graphic design to transformer models' },
    { name: 'Debugging', score: 14, note: '+2 when armed with console.log' },
    { name: 'Teamwork', score: 16, note: 'Speaks fluent Designer and Developer' },
    { name: 'Schafkopf', score: 20, note: 'Natural 20. Will teach you.' },
];

const traits = [
    { label: 'Personality', text: 'Redesigns things nobody asked to be redesigned – see: Schafkopf cards.' },
    { label: 'Ideal', text: 'Interfaces should be both beautiful and easy to use.' },
    { label: 'Bond', text: 'Bringing Bavarian card games to Denmark, one player at a time.' },
    { label: 'Flaw', text: 'Will notice your kerning.' },
];

const inventory = ['Figma', 'VS Code', 'A deck of Bavarian cards', 'An ever-growing Letterboxd watchlist', 'Donuts (for defence)'];

// D&D ability modifier: (score - 10) / 2, rounded down
const modifier = (score: number) => {
    const mod = Math.floor((score - 10) / 2);
    return mod >= 0 ? `+${mod}` : `${mod}`;
};

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
            </header>

            <div className="sheet-body">
                <div className="sheet-abilities" role="group" aria-label="Ability scores">
                    {abilities.map((ability) => (
                        <div key={ability.name} className="ability">
                            <span className="sheet-label">{ability.name}</span>
                            <span className="ability-modifier">{modifier(ability.score)}</span>
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
