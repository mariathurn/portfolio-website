import { useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import '../styles/AlmsommerStory.css';
import ProjectStory, { Chevron, type Slide } from './ProjectStory';
import TrumpHand from './TrumpHand';
import { cardImage, motifs, ranksInDeckOrder, suitNames, suitsStrongestFirst, type Card } from '../data/almsommerCards';
import menuLandscape from '../assets/almsommer/menu-landscape.webp';
import gameLandscape from '../assets/almsommer/game-landscape.webp';
import choiceLandscape from '../assets/almsommer/game-choice-landscape.webp';
import menuPortrait from '../assets/almsommer/menu-portrait.webp';
import gamePortrait from '../assets/almsommer/game-portrait.webp';
import choicePortrait from '../assets/almsommer/game-choice-portrait.webp';

export const ALMSOMMER_URL = 'https://almsommer.mariathurn.de/';

const screens = [
    { label: 'Title screen', landscape: menuLandscape, portrait: menuPortrait },
    { label: 'Choosing a game', landscape: choiceLandscape, portrait: choicePortrait },
    { label: 'Mid-trick', landscape: gameLandscape, portrait: gamePortrait },
];

function ScreenPair() {
    const [index, setIndex] = useState(0);
    const screen = screens[index];
    return (
        <div className="screen-pair">
            <div className="screen-pair-devices">
                <img className="screen-desktop" src={screen.landscape} alt={`${screen.label} on a wide screen`} loading="lazy" />
                <img className="screen-phone" src={screen.portrait} alt={`${screen.label} on a phone`} loading="lazy" />
            </div>
            <div className="story-segments" role="group" aria-label="Choose a screen">
                {screens.map((s, i) => (
                    <button key={s.label} type="button" className={i === index ? 'is-selected' : undefined} aria-pressed={i === index} onClick={() => setIndex(i)}>
                        {s.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

const deck: Card[] = suitsStrongestFirst.flatMap((suit) => ranksInDeckOrder.map((rank) => ({ suit, rank })));

// All 24 cards; a click shows one large over a darkened background, with arrows to page through the deck.
function DeckGrid({ active }: { active: boolean }) {
    const lightboxRef = useRef<HTMLDialogElement>(null);
    const [selected, setSelected] = useState<number | null>(null);
    const name = (card: Card) => `${motifs[card.rank]}, ${suitNames[card.suit].split(' ·')[0].toLowerCase()}`;

    const show = (i: number) => {
        setSelected(i);
        lightboxRef.current?.showModal();
    };

    // Wraps around, so the last card leads back to the first.
    const step = (delta: number) => setSelected((i) => (i === null ? i : (i + delta + deck.length) % deck.length));

    const onKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
        if (event.key === 'ArrowRight') step(1);
        if (event.key === 'ArrowLeft') step(-1);
    };

    const card = selected === null ? null : deck[selected];

    return (
        <div className="deck-grid">
            {suitsStrongestFirst.map((suit, row) => (
                <div key={suit} className="deck-grid-row">
                    <h4>{suitNames[suit]}</h4>
                    <div className="deck-grid-cards">
                        {ranksInDeckOrder.map((rank, col) => (
                            <button key={rank} type="button" aria-label={`Enlarge ${name({ suit, rank })}`} onClick={() => show(row * ranksInDeckOrder.length + col)}>
                                <img src={cardImage({ suit, rank })} alt="" loading={active ? 'eager' : 'lazy'} />
                            </button>
                        ))}
                    </div>
                </div>
            ))}

            {/* A nested modal dialog: Esc closes only the card, not the slideshow. */}
            <dialog ref={lightboxRef} className="card-lightbox" onClick={() => lightboxRef.current?.close()} onClose={() => setSelected(null)} onKeyDown={onKeyDown}>
                {card ? (
                    <>
                        <button type="button" className="card-lightbox-arrow" aria-label="Previous card" onClick={(e) => { e.stopPropagation(); step(-1); }}>
                            <Chevron direction="left" size={32} />
                        </button>
                        <figure>
                            <img src={cardImage(card)} alt={name(card)} />
                            <figcaption>
                                {name(card)} <span>{selected! + 1} / {deck.length}</span>
                            </figcaption>
                        </figure>
                        <button type="button" className="card-lightbox-arrow" aria-label="Next card" onClick={(e) => { e.stopPropagation(); step(1); }}>
                            <Chevron direction="right" size={32} />
                        </button>
                    </>
                ) : null}
            </dialog>
        </div>
    );
}

const slides: Slide[] = [
    {
        kicker: 'Schafkopf on an alpine meadow',
        title: 'Almsommer',
        visual: () => <img className="story-shot" src={menuLandscape} alt="The Almsommer title screen: four illustrated shepherds on a meadow at dusk" />,
        text: (
            <>
                <p>
                    Almsommer is the Bavarian card game Schafkopf as an app for Android, iOS and the web. You play against
                    three computer opponents, and a guided first game and practice rounds help new players learn the
                    rules.
                </p>
                <p>
                    It's my favourite card game, and I wanted to make it easier for people outside Bavaria to learn. I
                    made Almsommer entirely on my own: I wrote all of the code, illustrated every card and figure, and
                    designed the whole interface.
                </p>
                <p className="story-badge">Coming soon to Google Play</p>
                <a className="button button-dark" href={ALMSOMMER_URL} target="_blank" rel="noopener noreferrer">
                    Play in the browser
                </a>
            </>
        ),
    },
    {
        kicker: 'Illustration & card design',
        title: 'A deck of my own',
        visual: () => (
            <div className="deck-fan">
                {suitsStrongestFirst.map((suit, i) => (
                    <img key={suit} src={cardImage({ suit, rank: 'O' })} alt={`Shepherd of ${suitNames[suit].split(' ·')[0].toLowerCase()}`} style={{ '--i': i } as CSSProperties} />
                ))}
            </div>
        ),
        text: (
            <>
                <p>
                    Classic Bavarian cards are hard to read if you didn't grow up with them. I illustrated a new deck
                    with figures from alpine farm life, one colour per suit:
                </p>
                <dl className="story-mapping">
                    <dt>Ober</dt><dd>Shepherd</dd>
                    <dt>Unter</dt><dd>Dog</dd>
                    <dt>Ace ("Sau")</dt><dd>Sheep</dd>
                    <dt>Ten</dt><dd>Grain</dd>
                    <dt>King</dt><dd>Staff</dd>
                    <dt>Nine</dt><dd>Hat</dd>
                </dl>
                <p>
                    Every card also shows a number for its strength (1–12) and a yellow tab with its points, so
                    beginners can see which card wins without learning the order by heart.
                </p>
            </>
        ),
    },
    {
        kicker: 'Game logic',
        title: 'Trumps at a glance',
        visual: (active) => <TrumpHand active={active} />,
        text: (
            <>
                <p>
                    Which cards are trumps depends on the game being played, and that is the hardest part for
                    newcomers. So the hand sorts itself: trumps move to the left, strongest first, rise slightly and
                    get a crown.
                </p>
                <p>
                    The rules engine decides which cards are legal for every move: following suit, trumps, and the
                    special rules for the called sheep. Cards you can't play are greyed out, so you never get an error
                    message.
                </p>
                <p className="story-try">Try it: pick a game below the hand.</p>
            </>
        ),
    },
    {
        kicker: 'Responsive design',
        title: 'One layout, every screen',
        visual: () => <ScreenPair />,
        text: (
            <>
                <p>
                    The game is laid out on a canvas that scales like a browser game. In landscape the height stays
                    fixed and the width stretches between 1100 and 1700 units. In portrait the width stays fixed and
                    the table grows taller. Beyond those limits the game sits centred, so it never looks stretched.
                </p>
                <p>
                    On phones the opponents move to the top as round portraits, and a card is played with two taps –
                    the first raises it, the second plays it – so you can't play the wrong card by accident.
                </p>
                <p>One Expo / React Native codebase runs on Android, iOS and the web.</p>
            </>
        ),
    },
    {
        kicker: 'Computer players',
        title: 'Smart Opponents',
        visual: () => <img className="story-shot" src={choiceLandscape} alt="The game picker with Sheep Game, Solo, Dog Game and Marriage" loading="lazy" />,
        text: (
            <>
                <p>
                    The three opponents decide what to play by counting their trumps. When they play cards, they know
                    who their partner is: they add points to a trick their partner is sure to win, take valuable tricks
                    as cheaply as possible, and search for the called sheep.
                </p>
                <p>
                    Five game types follow the rulebook – Sheep Game, Solo, Dog Game, Marriage and the Cowards Game
                    when everybody passes. Scoring is zero-sum, and the rules, computer players and scoring are covered
                    by unit tests.
                </p>
            </>
        ),
    },
    {
        kicker: 'A bit of history',
        title: 'Why sheep?',
        visual: () => (
            <div className="deck-fan">
                {suitsStrongestFirst.map((suit, i) => (
                    <img key={suit} src={cardImage({ suit, rank: 'A' })} alt="" style={{ '--i': i } as CSSProperties} />
                ))}
            </div>
        ),
        text: (
            <>
                <p>
                    Schafkopf literally means "sheep's head". The game has been played in German-speaking lands since at
                    least the late 18th century – a journal from 1789 already mentions it – and in the 19th century it
                    became the card game of Bavaria and Franconia.
                </p>
                <p>
                    Nobody knows for sure where the name comes from. One story says players kept score with tally
                    marks that slowly formed the outline of a sheep's head. Another says it comes from "Schaffkopf",
                    the lid of a barrel, which made a handy card table.
                </p>
            </>
        ),
    },
    {
        kicker: 'All 24 cards',
        title: 'The whole deck',
        wide: true,
        visual: (active) => <DeckGrid active={active} />,
        text: null,
    },
];

type Props = {
    open: boolean;
    onClose: () => void;
};

function AlmsommerStory({ open, onClose }: Props) {
    return <ProjectStory open={open} onClose={onClose} title="Almsommer" className="almsommer-story" slides={slides} />;
}

export default AlmsommerStory;
