// The 24 cards of the Almsommer deck, rendered from the game (src/assets/almsommer/cards).

export type Suit = 'acorn' | 'leaf' | 'heart' | 'bell';
export type Rank = '9' | 'K' | '10' | 'A' | 'U' | 'O';
export type Card = { suit: Suit; rank: Rank };

const images = import.meta.glob<string>('../assets/almsommer/cards/*.webp', { eager: true, import: 'default' });

// Almsommer replaces the classic figures: Nine → hat, King → staff, Ten → grain,
// Ace ("Sau") → sheep, Unter → dog, Ober → shepherd.
export const motifs: Record<Rank, string> = {
    '9': 'hat',
    K: 'staff',
    '10': 'grain',
    A: 'sheep',
    U: 'dog',
    O: 'shepherd',
};

export const suitNames: Record<Suit, string> = {
    acorn: 'Acorns · blue',
    leaf: 'Leaves · green',
    heart: 'Hearts · red',
    bell: 'Bells · orange',
};

export const suitsStrongestFirst: Suit[] = ['acorn', 'leaf', 'heart', 'bell'];
export const ranksInDeckOrder: Rank[] = ['9', 'K', '10', 'A', 'U', 'O'];

export const cardImage = ({ suit, rank }: Card) => images[`../assets/almsommer/cards/${motifs[rank]}-${suit}.webp`];
