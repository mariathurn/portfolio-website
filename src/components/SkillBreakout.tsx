import { useEffect, useMemo, useRef, useState } from 'react';
import { categoryColor, skills, type Skill } from '../data/skills';

// Breakout where every brick is a skill. Hit a brick and it falls –
// catch it with the paddle to unlock it, miss it and it flies back to the wall.

type Status = 'idle' | 'ready' | 'playing' | 'won';

type Brick = {
    skill: Skill;
    homeX: number;
    homeY: number;
    x: number;
    y: number;
    vy: number;
    state: 'wall' | 'falling' | 'collected';
};

type Layout = { W: number; H: number; brickW: number; brickH: number; font: number; speed: number };

const BRICK_GAP = 10;
const SIDE_PAD = 24;
const TOP_PAD = 56;
const BRICK_H = 40;
const PADDLE_W = 120;
const PADDLE_H = 14;
const BALL_SIZE = 14;
const NARROW_BREAKPOINT = 560;

// Wide: one row per category. Narrow (phones): three bricks per row.
const buildLayout = (narrow: boolean, collected: Set<string>) => {
    const W = narrow ? 480 : 960;
    const cols = narrow ? 3 : 6;
    const brickW = (W - SIDE_PAD * 2 - BRICK_GAP * (cols - 1)) / cols;

    const rows: Skill[][] = [];
    if (narrow) {
        for (let i = 0; i < skills.length; i += cols) rows.push(skills.slice(i, i + cols));
    } else {
        for (const category of ['frontend', 'design', 'software', 'ai'] as const) {
            rows.push(skills.filter((skill) => skill.category === category));
        }
    }

    const bricks: Brick[] = rows.flatMap((row, r) => {
        const rowWidth = row.length * brickW + (row.length - 1) * BRICK_GAP;
        const startX = (W - rowWidth) / 2;
        return row.map((skill, c) => {
            const x = startX + c * (brickW + BRICK_GAP);
            const y = TOP_PAD + r * (BRICK_H + BRICK_GAP);
            return {
                skill, homeX: x, homeY: y, x, y, vy: 0,
                state: collected.has(skill.name) ? 'collected' : 'wall',
            } as Brick;
        });
    });

    const wallBottom = TOP_PAD + rows.length * (BRICK_H + BRICK_GAP);
    const layout: Layout = {
        W,
        H: wallBottom + (narrow ? 300 : 280),
        brickW,
        brickH: BRICK_H,
        font: narrow ? 17 : 16,
        speed: narrow ? 6 : 7,
    };
    return { layout, bricks };
};

// Unlocked skills leave the wall; reset skills (e.g. "Play again") go back to it
const syncBricks = (g: { bricks: Brick[]; ball: { stuck: boolean } }, collected: string[]) => {
    const names = new Set(collected);
    for (const brick of g.bricks) {
        if (names.has(brick.skill.name)) {
            brick.state = 'collected';
        } else if (brick.state === 'collected') {
            brick.state = 'wall';
            brick.x = brick.homeX;
            brick.y = brick.homeY;
        }
    }
    if (names.size === 0) g.ball.stuck = true;
};

type Props = {
    collected: string[];
    onCollect: (skill: Skill) => void;
    onRestart: () => void;
};

function SkillBreakout({ collected, onCollect, onRestart }: Props) {
    const wrapRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [playStatus, setStatus] = useState<Exclude<Status, 'won'>>('idle');
    const [narrow, setNarrow] = useState(false);
    const layout = useMemo<Layout>(() => buildLayout(narrow, new Set()).layout, [narrow]);
    const status: Status = collected.length === skills.length ? 'won' : playStatus;

    // Mutable game state lives in a ref so the animation loop doesn't re-render React
    const game = useRef({
        bricks: [] as Brick[],
        layout,
        paddleX: 480,
        ball: { x: 0, y: 0, vx: 0, vy: 0, stuck: true },
        keys: { left: false, right: false },
        status: 'idle' as Status,
    });
    const onCollectRef = useRef(onCollect);

    useEffect(() => {
        onCollectRef.current = onCollect;
    }, [onCollect]);

    useEffect(() => {
        game.current.status = status;
    }, [status]);

    // Switch between wide and narrow layout with the container width
    useEffect(() => {
        const wrap = wrapRef.current;
        if (!wrap) return;
        const observer = new ResizeObserver(([entry]) => {
            setNarrow(entry.contentRect.width < NARROW_BREAKPOINT);
        });
        observer.observe(wrap);
        return () => observer.disconnect();
    }, []);

    // Rebuild the wall when switching between wide and narrow layout
    const collectedRef = useRef(collected);
    useEffect(() => {
        const built = buildLayout(narrow, new Set(collectedRef.current));
        const g = game.current;
        g.bricks = built.bricks;
        g.layout = built.layout;
        g.paddleX = Math.min(Math.max(g.paddleX, PADDLE_W / 2), built.layout.W - PADDLE_W / 2);
        g.ball.stuck = true;
    }, [narrow]);

    // Sync bricks with skills unlocked or reset from outside ("Unlock all", "Play again")
    useEffect(() => {
        collectedRef.current = collected;
        syncBricks(game.current, collected);
    }, [collected]);

    // Animation loop – only runs while the board is on screen
    useEffect(() => {
        const canvas = canvasRef.current;
        const wrap = wrapRef.current;
        if (!canvas || !wrap) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let frame = 0;
        let last = performance.now();
        let visible = false;

        const resizeCanvas = () => {
            const { W, H } = game.current.layout;
            const dpr = window.devicePixelRatio || 1;
            const cssWidth = canvas.clientWidth;
            canvas.width = Math.round(cssWidth * dpr);
            canvas.height = Math.round((cssWidth * dpr * H) / W);
            const scale = canvas.width / W;
            ctx.setTransform(scale, 0, 0, scale, 0, 0);
        };

        const launch = () => {
            const g = game.current;
            const angle = (Math.random() * 0.6 - 0.3);
            g.ball.vx = g.layout.speed * Math.sin(angle);
            g.ball.vy = -g.layout.speed * Math.cos(angle);
            g.ball.stuck = false;
        };

        const step = (k: number) => {
            const g = game.current;
            const { W, H, brickW, brickH, speed } = g.layout;
            const paddleY = H - 40;

            if (g.keys.left) g.paddleX -= 12 * k;
            if (g.keys.right) g.paddleX += 12 * k;
            g.paddleX = Math.min(Math.max(g.paddleX, PADDLE_W / 2), W - PADDLE_W / 2);

            const ball = g.ball;
            const r = BALL_SIZE / 2;

            if (g.status === 'playing' && ball.stuck) launch();

            if (ball.stuck) {
                ball.x = g.paddleX;
                ball.y = paddleY - r - 1;
            } else {
                const prevX = ball.x;
                const prevY = ball.y;
                ball.x += ball.vx * k;
                ball.y += ball.vy * k;

                // Walls
                if (ball.x < r) { ball.x = r; ball.vx = Math.abs(ball.vx); }
                if (ball.x > W - r) { ball.x = W - r; ball.vx = -Math.abs(ball.vx); }
                if (ball.y < r) { ball.y = r; ball.vy = Math.abs(ball.vy); }

                // Paddle: the further from the centre, the steeper the bounce
                const left = g.paddleX - PADDLE_W / 2;
                if (
                    ball.vy > 0 &&
                    ball.y + r >= paddleY && prevY + r <= paddleY + PADDLE_H &&
                    ball.x >= left - r && ball.x <= left + PADDLE_W + r
                ) {
                    const hit = Math.max(-1, Math.min(1, (ball.x - g.paddleX) / (PADDLE_W / 2)));
                    // A little randomness and a minimum tilt, so the ball can't get stuck going straight up and down
                    let angle = hit * (Math.PI / 3) + (Math.random() - 0.5) * 0.15;
                    if (Math.abs(angle) < 0.12) angle = angle < 0 ? -0.12 : 0.12;
                    ball.vx = speed * Math.sin(angle);
                    ball.vy = -speed * Math.cos(angle);
                    ball.y = paddleY - r;
                }

                // Bricks: one hit per frame
                for (const brick of g.bricks) {
                    if (brick.state !== 'wall') continue;
                    const closestX = Math.max(brick.x, Math.min(ball.x, brick.x + brickW));
                    const closestY = Math.max(brick.y, Math.min(ball.y, brick.y + brickH));
                    if ((ball.x - closestX) ** 2 + (ball.y - closestY) ** 2 > r * r) continue;

                    const cameFromSide = prevX + r <= brick.x || prevX - r >= brick.x + brickW;
                    if (cameFromSide) ball.vx = -ball.vx;
                    else ball.vy = -ball.vy;

                    brick.state = 'falling';
                    brick.vy = 1.5;
                    break;
                }

                // Ball lost: back onto the paddle
                if (ball.y - r > H) {
                    ball.stuck = true;
                    g.status = 'ready';
                    setStatus('ready');
                }
            }

            // Falling bricks: caught = unlocked, missed = back to the wall
            for (const brick of g.bricks) {
                if (brick.state !== 'falling') continue;
                brick.vy += 0.06 * k;
                brick.y += brick.vy * k;

                const left = g.paddleX - PADDLE_W / 2;
                const caught =
                    brick.y + brickH >= paddleY && brick.y <= paddleY + PADDLE_H &&
                    brick.x + brickW >= left && brick.x <= left + PADDLE_W;

                if (caught) {
                    brick.state = 'collected';
                    onCollectRef.current(brick.skill);
                } else if (brick.y > H) {
                    brick.state = 'wall';
                    brick.x = brick.homeX;
                    brick.y = brick.homeY;
                }
            }
        };

        const fitText = (text: string, maxWidth: number, size: number) => {
            let fontSize = size;
            ctx.font = `600 ${fontSize}px Rubik, sans-serif`;
            while (ctx.measureText(text).width > maxWidth && fontSize > 9) {
                fontSize -= 1;
                ctx.font = `600 ${fontSize}px Rubik, sans-serif`;
            }
        };

        const draw = () => {
            const g = game.current;
            const { W, H, brickW, brickH, font } = g.layout;
            ctx.clearRect(0, 0, W, H);

            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            for (const brick of g.bricks) {
                if (brick.state === 'collected') continue;
                ctx.fillStyle = categoryColor(brick.skill.category);
                ctx.beginPath();
                ctx.roundRect(brick.x, brick.y, brickW, brickH, 6);
                ctx.fill();
                ctx.fillStyle = '#1f2328';
                fitText(brick.skill.name, brickW - 12, font);
                ctx.fillText(brick.skill.name, brick.x + brickW / 2, brick.y + brickH / 2 + 1);
            }

            // Paddle and a square, pixel-style ball
            if (g.status !== 'idle' && g.status !== 'won') {
                ctx.fillStyle = '#fff';
                ctx.beginPath();
                ctx.roundRect(g.paddleX - PADDLE_W / 2, H - 40, PADDLE_W, PADDLE_H, 7);
                ctx.fill();
                ctx.fillRect(g.ball.x - BALL_SIZE / 2, g.ball.y - BALL_SIZE / 2, BALL_SIZE, BALL_SIZE);
            }
        };

        const tick = (now: number) => {
            const k = Math.min((now - last) / 16.67, 2);
            last = now;
            step(k);
            draw();
            frame = requestAnimationFrame(tick);
        };

        const start = () => {
            if (frame) return;
            last = performance.now();
            frame = requestAnimationFrame(tick);
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

        // Redraw once the web font is ready so brick labels use Rubik
        document.fonts?.ready.then(() => draw());

        return () => {
            stop();
            visibility.disconnect();
            resize.disconnect();
        };
    }, [layout]);

    // Input: mouse/finger moves the paddle, click/tap or Space launches
    const movePaddle = (clientX: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        game.current.paddleX = ((clientX - rect.left) / rect.width) * game.current.layout.W;
    };

    const play = () => {
        if (status === 'won') {
            onRestart();
            setStatus('ready');
            canvasRef.current?.focus();
            return;
        }
        setStatus('playing');
        canvasRef.current?.focus();
    };

    const onKey = (event: React.KeyboardEvent, down: boolean) => {
        const keys = game.current.keys;
        if (event.key === 'ArrowLeft') keys.left = down;
        else if (event.key === 'ArrowRight') keys.right = down;
        else if (down && (event.key === ' ' || event.key === 'Enter') && status !== 'won') setStatus('playing');
        else return;
        event.preventDefault();
    };

    const isActive = status === 'ready' || status === 'playing';

    return (
        <div className="breakout" ref={wrapRef}>
            <canvas
                ref={canvasRef}
                className={`breakout-canvas ${isActive ? 'is-active' : ''}`}
                style={{ aspectRatio: `${layout.W} / ${layout.H}` }}
                tabIndex={0}
                aria-label="Skill Breakout game. Use left and right arrow keys to move the paddle, Space to launch the ball."
                onPointerMove={(event) => isActive && movePaddle(event.clientX)}
                onPointerDown={(event) => {
                    if (!isActive) return;
                    movePaddle(event.clientX);
                    setStatus('playing');
                }}
                onKeyDown={(event) => onKey(event, true)}
                onKeyUp={(event) => onKey(event, false)}
            />

            {status === 'idle' && (
                <div className="breakout-overlay">
                    <button type="button" className="button button-primary breakout-play" onClick={play}>
                        ▶ Play Skill Breakout
                    </button>
                    <p>Break a skill, catch it with the paddle to unlock it.</p>
                </div>
            )}

            {status === 'ready' && (
                <p className="breakout-hint" aria-live="polite">Click, tap or press Space to launch</p>
            )}

            {status === 'won' && (
                <div className="breakout-overlay">
                    <p className="breakout-win">All skills unlocked! 🎉</p>
                    <button type="button" className="button button-primary breakout-play" onClick={play}>
                        Play again
                    </button>
                </div>
            )}
        </div>
    );
}

export default SkillBreakout;
