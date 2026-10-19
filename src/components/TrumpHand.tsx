import { useEffect, useState } from 'react';
import { cardImage, type Card, type Rank, type Suit } from '../data/almsommerCards';

type Game = 'dealt' | 'sheep' | 'dog' | 'solo';

const games: { id: Game; label: string; hint: string }[] = [
    { id: 'dealt', label: 'Just dealt', hint: 'Unsorted, as the cards come off the deck.' },
    { id: 'sheep', label: 'Sheep Game', hint: 'Shepherds, dogs and every red card are trumps.' },
    { id: 'dog', label: 'Dog Game', hint: 'Only the four dogs are trumps – the shepherd becomes an ordinary card.' },
    { id: 'solo', label: 'Green Solo', hint: 'Shepherds, dogs and the green suit are trumps.' },
];

const hand: Card[] = [
    { suit: 'leaf', rank: 'O' },
    { suit: 'heart', rank: 'K' },
    { suit: 'bell', rank: 'U' },
    { suit: 'acorn', rank: '9' },
    { suit: 'heart', rank: 'A' },
    { suit: 'leaf', rank: '10' },
];

// Strongest first, for figures and for the suits.
const suitOrder: Suit[] = ['acorn', 'leaf', 'heart', 'bell'];
const plainOrder: Rank[] = ['A', '10', 'K', 'O', 'U', '9'];
const suitTrumpOrder: Rank[] = ['A', '10', 'K', '9'];

// Trump strength as in the app's rules engine (0 = strongest), or null for a plain card.
function trumpStrength({ suit, rank }: Card, game: Game): number | null {
    const suitIndex = suitOrder.indexOf(suit);
    if (game === 'dog') return rank === 'U' ? suitIndex : null;
    if (game === 'dealt') return null;
    if (rank === 'O') return suitIndex;
    if (rank === 'U') return 4 + suitIndex;
    const trumpSuit = game === 'sheep' ? 'heart' : 'leaf';
    return suit === trumpSuit ? 8 + suitTrumpOrder.indexOf(rank) : null;
}

function sortHand(game: Game): Card[] {
    if (game === 'dealt') return hand;
    const plainKey = (card: Card) => suitOrder.indexOf(card.suit) * 10 + plainOrder.indexOf(card.rank);
    return [...hand].sort((a, b) => {
        const ta = trumpStrength(a, game);
        const tb = trumpStrength(b, game);
        if (ta !== null && tb !== null) return ta - tb;
        if (ta !== null) return -1;
        if (tb !== null) return 1;
        return plainKey(a) - plainKey(b);
    });
}

type Props = {
    // The hand sorts itself into the Sheep Game once its slide comes into view.
    active: boolean;
};

function TrumpHand({ active }: Props) {
    const [game, setGame] = useState<Game>('dealt');

    useEffect(() => {
        if (!active) return;
        const timer = window.setTimeout(() => setGame('sheep'), 700);
        // Deal again when the slide is left, so the sorting plays every time it comes back.
        return () => {
            window.clearTimeout(timer);
            setGame('dealt');
        };
    }, [active]);

    const sorted = sortHand(game);
    const middle = (hand.length - 1) / 2;

    return (
        <div className="trump-hand">
            <div className="trump-hand-fan">
                {hand.map((card) => {
                    const slot = sorted.indexOf(card);
                    const isTrump = trumpStrength(card, game) !== null;
                    const offset = slot - middle;
                    return (
                        <div
                            key={`${card.suit}-${card.rank}`}
                            className={`trump-hand-card${isTrump ? ' is-trump' : ''}`}
                            style={{
                                // Fanned with room at the edges for the rotation.
                                left: `${4 + slot * 14.4}%`,
                                zIndex: slot,
                                transform: `translateY(${offset * offset * 2.2 - (isTrump ? 16 : 0)}px) rotate(${offset * 4}deg)`,
                            }}
                        >
                            <img src={cardImage(card)} alt="" />
                            <span className="trump-crown" aria-hidden="true">♛</span>
                        </div>
                    );
                })}
            </div>
            <div className="trump-hand-games" role="group" aria-label="Choose a game">
                {games.map(({ id, label }) => (
                    <button
                        key={id}
                        type="button"
                        className={id === game ? 'is-selected' : undefined}
                        aria-pressed={id === game}
                        onClick={() => setGame(id)}
                    >
                        {label}
                    </button>
                ))}
            </div>
            <p className="trump-hand-hint" aria-live="polite">{games.find((g) => g.id === game)?.hint}</p>
        </div>
    );
}

export default TrumpHand;
