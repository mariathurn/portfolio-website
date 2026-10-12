// Undertale-style pixel portrait. Each character in the grid is one pixel, see `palette`.
const sprite = [
    '......KKKKKKKK......',
    '....KKHHHHHHHHKK....',
    '...KHHLLLHHHHHHHK...',
    '..KHLLHHHHHHHHHHHK..',
    '..KHHHHSSSSSSSHHHK..',
    '..KHSSSSSSSSSSSSHK..',
    '..KHSGGGGSSGGGGSHK..',
    '..KHSGSEGGGGESGSHK..',
    '..KHSGGGGSSGGGGSHK..',
    '..KHSPSSSSSSSSPSHK..',
    '..KHSSSMSSSSMSSSHK..',
    '...KSSSSMMMMSSSSK...',
    '....KSSSSSSSSSSK....',
    '.....KKSSSSSSKK.....',
    '.......KSSSSK.......',
    '....KKKWSSSSWKKK....',
    '..KKWWWWSNNSWWWWKK..',
    '.KWWWWWWWSSWWWWWWWK.',
    '.KWWWWWWWWWWWWWWWWK.',
    'KWWwWWWWWWWWWWWWwWWK',
    'KWWwWWWWWWWWWWWWwWWK',
    'KWWwWWWWWWWWWWWWwWWK',
];

const palette: Record<string, string> = {
    K: '#2b2620', // outline
    H: '#e8c27a', // hair
    L: '#f7e1a8', // hair highlight
    S: '#f6d3b8', // skin
    P: '#f2a6a0', // cheeks
    G: '#c98f86', // glasses
    E: '#2b2620', // eyes
    M: '#2b2620', // smile
    W: '#2f5a46', // sweater
    w: '#23463a', // sweater shadow
    N: '#e6c35c', // necklace
};

// Merge horizontal runs of the same colour into one rect to keep the SVG small
const pixels = sprite.flatMap((row, y) => {
    const runs: { x: number; width: number; color: string }[] = [];
    for (let x = 0; x < row.length; x++) {
        const color = palette[row[x]];
        if (!color) continue;
        const last = runs[runs.length - 1];
        if (last && last.color === color && last.x + last.width === x) {
            last.width++;
        } else {
            runs.push({ x, width: 1, color });
        }
    }
    return runs.map((run) => ({ ...run, y }));
});

function PixelPortrait() {
    return (
        <svg
            className="pixel-portrait"
            viewBox={`0 0 ${sprite[0].length} ${sprite.length}`}
            shapeRendering="crispEdges"
            role="img"
            aria-label="Pixel art portrait of Maria"
        >
            {pixels.map((p) => (
                <rect key={`${p.x}-${p.y}`} x={p.x} y={p.y} width={p.width} height={1} fill={p.color} />
            ))}
        </svg>
    );
}

export default PixelPortrait;
