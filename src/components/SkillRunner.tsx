import { useEffect, useMemo, useRef, useState } from 'react';
import { categories, categoryColor, skills, type Skill } from '../data/skills';
import { wizardPalette, wizardSprite } from '../data/wizardSprite';

// Side-scrolling runner: the pixel wizard runs on its own, tap/Space to jump (twice for a
// double jump) and collect skill bubbles. Missed bubbles come back later – no game over.

type Status = 'idle' | 'playing' | 'won';

type Bubble = { skill: Skill; x: number; y: number; w: number; phase: number };
type Popup = { text: string; color: string; x: number; y: number; life: number };

type Layout = { W: number; H: number; ground: number; speed: number };

const NARROW_BREAKPOINT = 560;
const PIXEL = 3; // size of one sprite pixel in game units
const SPRITE_W = wizardSprite[0].length * PIXEL;
const SPRITE_H = wizardSprite.length * PIXEL;
const FEET_H = 2 * PIXEL;
const BUBBLE_H = 32;
const GRAVITY = 0.6;
const JUMP_V = -12;
// Bubble heights above the ground: walk into it, single jump, double jump
const LANES = [48, 125, 205];

const buildLayout = (narrow: boolean): Layout => {
    const W = narrow ? 480 : 900;
    const H = narrow ? 320 : 300;
    return { W, H, ground: H - 44, speed: narrow ? 3.4 : 4.2 };
};

const shuffle = <T,>(items: T[]) => {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
};

type Game = {
    layout: Layout;
    status: Status;
    player: { y: number; vy: number; jumpsLeft: number };
    bubbles: Bubble[];
    queue: Skill[];
    collected: Set<string>;
    distance: number;
    nextSpawn: number;
    popups: Popup[];
};

// Keep bubbles and the spawn queue in line with the collected skills (also after "Fill all" / "Play again")
const syncGame = (g: Game, collected: string[]) => {
    g.collected = new Set(collected);
    g.bubbles = g.bubbles.filter((b) => !g.collected.has(b.skill.name));
    const onScreen = new Set(g.bubbles.map((b) => b.skill.name));
    g.queue = shuffle(skills.filter((s) => !g.collected.has(s.name) && !onScreen.has(s.name)));
};

function SkillRunner({ collected, onCollect, onRestart }: {
    collected: string[];
    onCollect: (skill: Skill) => void;
    onRestart: () => void;
}) {
    const wrapRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [playStatus, setPlayStatus] = useState<Exclude<Status, 'won'>>('idle');
    const [narrow, setNarrow] = useState(false);
    const layout = useMemo(() => buildLayout(narrow), [narrow]);
    const status: Status = collected.length === skills.length ? 'won' : playStatus;

    const game = useRef<Game>({
        layout,
        status: 'idle',
        player: { y: 0, vy: 0, jumpsLeft: 2 },
        bubbles: [],
        queue: shuffle(skills),
        collected: new Set(),
        distance: 0,
        nextSpawn: 0,
        popups: [],
    });
    const onCollectRef = useRef(onCollect);

    useEffect(() => {
        onCollectRef.current = onCollect;
    }, [onCollect]);

    useEffect(() => {
        game.current.status = status;
    }, [status]);

    useEffect(() => {
        syncGame(game.current, collected);
    }, [collected]);

    useEffect(() => {
        const wrap = wrapRef.current;
        if (!wrap) return;
        const observer = new ResizeObserver(([entry]) => setNarrow(entry.contentRect.width < NARROW_BREAKPOINT));
        observer.observe(wrap);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const wrap = wrapRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !wrap || !ctx) return;

        const g = game.current;
        g.layout = layout;
        const { W, H, ground } = layout;
        const playerX = Math.round(W * 0.14);

        let frame = 0;
        let last = performance.now();
        let visible = false;
        let tick = 0;

        const bubbleWidth = (name: string) => {
            ctx.font = '600 15px Rubik, sans-serif';
            return Math.ceil(ctx.measureText(name).width) + 28;
        };

        const spawn = (x: number) => {
            const skill = g.queue.shift();
            if (!skill) return;
            const lane = LANES[Math.floor(Math.random() * LANES.length)];
            g.bubbles.push({ skill, x, y: ground - lane, w: bubbleWidth(skill.name), phase: Math.random() * Math.PI * 2 });
        };

        // A few bubbles already waiting on screen before the game starts
        if (g.bubbles.length === 0 && g.status === 'idle') {
            [0.45, 0.7, 0.95].forEach((at) => spawn(W * at));
            g.nextSpawn = 260;
        }

        const resizeCanvas = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = Math.round(canvas.clientWidth * dpr);
            canvas.height = Math.round((canvas.clientWidth * dpr * H) / W);
            const scale = canvas.width / W;
            ctx.setTransform(scale, 0, 0, scale, 0, 0);
            ctx.imageSmoothingEnabled = false;
        };

        const step = (k: number) => {
            const p = g.player;
            const running = g.status === 'playing';

            // Jump physics
            p.vy += GRAVITY * k;
            p.y += p.vy * k;
            if (p.y >= 0) {
                p.y = 0;
                p.vy = 0;
                p.jumpsLeft = 2;
            }

            if (running) {
                const dx = g.layout.speed * k;
                g.distance += dx;
                g.bubbles.forEach((b) => { b.x -= dx; });

                g.nextSpawn -= dx;
                if (g.nextSpawn <= 0) {
                    spawn(W + 20);
                    g.nextSpawn = 200 + Math.random() * 140;
                }
            }

            // Collect: overlap between the wizard and a bubble
            const top = ground + p.y - SPRITE_H - FEET_H;
            const bottom = ground + p.y;
            const left = playerX + 8;
            const right = playerX + SPRITE_W - 8;
            g.bubbles = g.bubbles.filter((b) => {
                const hit = b.x < right && b.x + b.w > left && b.y - BUBBLE_H / 2 < bottom && b.y + BUBBLE_H / 2 > top;
                if (hit && running) {
                    g.collected.add(b.skill.name);
                    const label = categories.find((c) => c.id === b.skill.category)?.label ?? '';
                    g.popups.push({ text: `+1 ${label}`, color: categoryColor(b.skill.category), x: b.x + b.w / 2, y: b.y, life: 1 });
                    onCollectRef.current(b.skill);
                    return false;
                }
                // Missed: back into the queue for later
                if (b.x + b.w < -10) {
                    g.queue.push(b.skill);
                    return false;
                }
                return true;
            });

            g.popups.forEach((pop) => { pop.y -= 0.8 * k; pop.life -= 0.02 * k; });
            g.popups = g.popups.filter((pop) => pop.life > 0);
        };

        const drawWizard = (x: number, y: number) => {
            const p = g.player;
            const running = g.status === 'playing';
            const inAir = p.y < 0;
            const stride = Math.floor(tick / 7) % 2;
            const bob = running && !inAir && stride === 1 ? PIXEL : 0;
            const top = y - SPRITE_H - FEET_H + bob;

            wizardSprite.forEach((row, ry) => {
                for (let rx = 0; rx < row.length; rx++) {
                    const color = wizardPalette[row[rx]];
                    if (!color) continue;
                    ctx.fillStyle = color;
                    ctx.fillRect(x + rx * PIXEL, top + ry * PIXEL, PIXEL, PIXEL);
                }
            });

            // Little feet under the cloak, alternating while running
            ctx.fillStyle = wizardPalette.K;
            const feetY = top + SPRITE_H;
            const lift = running && !inAir ? stride * PIXEL : 0;
            ctx.fillRect(x + 6 * PIXEL, feetY - lift, 3 * PIXEL, FEET_H);
            ctx.fillRect(x + 11 * PIXEL, feetY - (running && !inAir ? (1 - stride) * PIXEL : 0), 3 * PIXEL, FEET_H);
        };

        const draw = () => {
            ctx.clearRect(0, 0, W, H);

            // Background sparkles, slower than the ground for a bit of depth
            ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
            for (let i = 0; i < 14; i++) {
                const sx = ((i * 137 - g.distance * 0.3) % (W + 40) + W + 40) % (W + 40) - 20;
                const sy = 20 + ((i * 53) % (ground - 120));
                ctx.fillRect(sx, sy - 6, 3, 15);
                ctx.fillRect(sx - 6, sy, 15, 3);
            }

            // Ground with moving tiles
            ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
            ctx.fillRect(0, ground, W, H - ground);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
            ctx.fillRect(0, ground, W, 4);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
            for (let tx = -(g.distance % 36); tx < W; tx += 36) ctx.fillRect(tx, ground + 14, 18, 4);

            // Skill bubbles
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = '600 15px Rubik, sans-serif';
            for (const b of g.bubbles) {
                const y = b.y + Math.sin(tick / 20 + b.phase) * 4;
                ctx.fillStyle = categoryColor(b.skill.category);
                ctx.beginPath();
                ctx.roundRect(b.x, y - BUBBLE_H / 2, b.w, BUBBLE_H, BUBBLE_H / 2);
                ctx.fill();
                // Speech-bubble tail
                ctx.beginPath();
                ctx.moveTo(b.x + 14, y + BUBBLE_H / 2 - 2);
                ctx.lineTo(b.x + 10, y + BUBBLE_H / 2 + 8);
                ctx.lineTo(b.x + 24, y + BUBBLE_H / 2 - 2);
                ctx.fill();
                ctx.fillStyle = '#1f2328';
                ctx.fillText(b.skill.name, b.x + b.w / 2, y + 1);
            }

            drawWizard(playerX, ground + g.player.y);

            // "+1 Frontend" popups
            ctx.font = '700 14px Rubik, sans-serif';
            for (const pop of g.popups) {
                ctx.globalAlpha = Math.max(pop.life, 0);
                ctx.fillStyle = pop.color;
                ctx.fillText(pop.text, pop.x, pop.y);
            }
            ctx.globalAlpha = 1;
        };

        const loop = (now: number) => {
            const k = Math.min((now - last) / 16.67, 2);
            last = now;
            tick += k;
            step(k);
            draw();
            frame = requestAnimationFrame(loop);
        };

        const start = () => {
            if (frame) return;
            last = performance.now();
            frame = requestAnimationFrame(loop);
        };
        const stop = () => {
            cancelAnimationFrame(frame);
            frame = 0;
        };

        const visibility = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            if (visible) start();
            else stop();
        });
        visibility.observe(wrap);

        const resize = new ResizeObserver(() => {
            resizeCanvas();
            if (!visible) draw();
        });
        resize.observe(canvas);
        document.fonts?.ready.then(() => draw());

        return () => {
            stop();
            visibility.disconnect();
            resize.disconnect();
        };
    }, [layout]);

    const jump = () => {
        const p = game.current.player;
        if (p.jumpsLeft <= 0) return;
        p.vy = JUMP_V;
        p.jumpsLeft -= 1;
    };

    const start = () => {
        if (status === 'won') onRestart();
        setPlayStatus('playing');
        canvasRef.current?.focus();
    };

    // Tap/Space: start or jump. After winning only the "Run again" button restarts,
    // so a last jump doesn't skip the win screen.
    const action = () => {
        if (status === 'playing') jump();
        else if (status === 'idle') start();
    };

    return (
        <div className="runner" ref={wrapRef}>
            <canvas
                ref={canvasRef}
                className="runner-canvas"
                style={{ aspectRatio: `${layout.W} / ${layout.H}` }}
                tabIndex={0}
                aria-label="Skill runner game. Press Space or tap to jump, twice for a double jump."
                onPointerDown={action}
                onKeyDown={(event) => {
                    if ([' ', 'ArrowUp', 'w', 'Enter'].includes(event.key)) {
                        event.preventDefault();
                        if (!event.repeat) action();
                    }
                }}
            />

            {status === 'idle' && (
                <div className="runner-overlay">
                    <button type="button" className="button button-primary" onClick={start}>▶ Start running</button>
                    <p>Tap or press Space to jump – twice for a double jump.</p>
                </div>
            )}

            {status === 'won' && (
                <div className="runner-overlay">
                    <p className="runner-win">All bars full! 🎉</p>
                    <button type="button" className="button button-primary" onClick={start}>Run again</button>
                </div>
            )}
        </div>
    );
}

export default SkillRunner;
