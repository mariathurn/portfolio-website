// Undertale-style pixel wizard. Each character in the grid is one pixel, see `palette`.
const sprite = [
    '.........KK.........',
    '........KCCK........',
    '........KCCK........',
    '.......KCCCCK.......',
    '.......KCYCCK.......',
    '......KCCCCCCK......',
    '......KCCCCYCK......',
    '.....KCCCCCCCCK.....',
    '....KYYYYYYYYYYK....',
    '..KKCCCCCCCCCCCCKK..',
    '.KCCCCCCCCCCCCCCCCK.',
    '..KKKHHHHHHHHHHKKK..',
    '...KHHSSSSSSSSHHK...',
    '...KHSSSSSSSSSSHK...',
    '...KHSSESSSSESSHK...',
    '...KHSPSSSSSSPSHK...',
    '...KHSSMSSSSMSSHK...',
    '...KHSSSMMMMSSSHK...',
    '...KHKSSSSSSSSKHK...',
    '...KHHKKSSSSKKHHK...',
    '....KKCCCSSCCCKK....',
    '...KCCCCCYYCCCCCK...',
    '..KCCCCCCCCCCCCCCK..',
    '.KCCcCCCCCCCCCCcCCK.',
    '.KCCcCCCCCCCCCCcCCK.',
    'KCCCcCCCCCCCCCCcCCCK',
    'KCCCcCCCCCCCCCCcCCCK',
];

const palette: Record<string, string> = {
    K: '#2b2620', // outline
    C: '#5b4a9e', // hat & cloak
    c: '#3f3373', // cloak folds
    Y: '#e6c35c', // stars, hat band & clasp
    H: '#e8c27a', // hair
    S: '#f6d3b8', // skin
    P: '#f2a6a0', // cheeks
    E: '#2b2620', // eyes
    M: '#2b2620', // smile
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
            aria-label="Pixel art of Maria as a wizard"
        >
            {pixels.map((p) => (
                <rect key={`${p.x}-${p.y}`} x={p.x} y={p.y} width={p.width} height={1} fill={p.color} />
            ))}
        </svg>
    );
}

export default PixelPortrait;
