import { wizardPalette, wizardSprite } from '../data/wizardSprite';

// Undertale-style pixel wizard, drawn as SVG.
const sprite = wizardSprite;
const palette = wizardPalette;

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
