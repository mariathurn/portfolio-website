import { useEffect, useRef, useState, type ReactNode } from 'react';

// Comic-style speech bubble: the rounded box and its tail are ONE svg path with one stroke,
// so the outline has no seams. The path is redrawn whenever the bubble changes size.
// The tail points left (at the photo) on wide screens and up on narrow ones.

const RADIUS = 34;
const TAIL = 20; // how far the tail sticks out
const STROKE = 3;
const NARROW = '(max-width: 750px)';

const bubblePath = (w: number, h: number, tailUp: boolean) => {
    const r = Math.min(RADIUS, h / 2, w / 2);
    // Draw on the stroke's centre line, so the 3px border stays inside the box
    const i = STROKE / 2;
    const L = i, T = i, R = w - i, B = h - i;

    if (tailUp) {
        // Tail on the top edge, sweeping up and slightly left
        const a = L + r + 8;
        const b = a + 26;
        return [
            `M ${L + r} ${T}`,
            `H ${a}`,
            `Q ${a - 2} ${T - TAIL * 0.5} ${a - 8} ${T - TAIL}`,
            `Q ${a + 8} ${T - TAIL * 0.6} ${b} ${T}`,
            `H ${R - r} A ${r} ${r} 0 0 1 ${R} ${T + r}`,
            `V ${B - r} A ${r} ${r} 0 0 1 ${R - r} ${B}`,
            `H ${L + r} A ${r} ${r} 0 0 1 ${L} ${B - r}`,
            `V ${T + r} A ${r} ${r} 0 0 1 ${L + r} ${T} Z`,
        ].join(' ');
    }

    // Tail on the left edge, sweeping out and slightly up
    const a = Math.min(T + r + 2, B - r - 28);
    const b = a + 26;
    return [
        `M ${L + r} ${T}`,
        `H ${R - r} A ${r} ${r} 0 0 1 ${R} ${T + r}`,
        `V ${B - r} A ${r} ${r} 0 0 1 ${R - r} ${B}`,
        `H ${L + r} A ${r} ${r} 0 0 1 ${L} ${B - r}`,
        `V ${b}`,
        `Q ${L - TAIL * 0.6} ${b - 6} ${L - TAIL} ${a - 8}`,
        `Q ${L - TAIL * 0.5} ${a - 2} ${L} ${a}`,
        `V ${T + r} A ${r} ${r} 0 0 1 ${L + r} ${T} Z`,
    ].join(' ');
};

function SpeechBubble({ className = '', children }: { className?: string; children: ReactNode }) {
    const ref = useRef<HTMLParagraphElement | null>(null);
    const [size, setSize] = useState({ w: 0, h: 0 });
    const [tailUp, setTailUp] = useState(() => window.matchMedia(NARROW).matches);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new ResizeObserver(() => setSize({ w: el.offsetWidth, h: el.offsetHeight }));
        observer.observe(el);

        const query = window.matchMedia(NARROW);
        const onChange = () => setTailUp(query.matches);
        query.addEventListener('change', onChange);

        return () => {
            observer.disconnect();
            query.removeEventListener('change', onChange);
        };
    }, []);

    return (
        <p ref={ref} className={`speech-bubble ${className}`}>
            {size.w > 0 && (
                <svg className="speech-bubble-shape" width={size.w} height={size.h} aria-hidden="true">
                    <path d={bubblePath(size.w, size.h, tailUp)} />
                </svg>
            )}
            {children}
        </p>
    );
}

export default SpeechBubble;
