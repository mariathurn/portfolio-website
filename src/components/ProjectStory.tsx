import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import '../styles/ProjectStory.css';

export type Slide = {
    title: string;
    kicker: string;
    // Rendered only for the current slide and its neighbours; active is true for the current one.
    visual: (active: boolean) => ReactNode;
    text: ReactNode;
    // Visual above the text instead of next to it
    wide?: boolean;
};

// Drawn instead of a text glyph so it sits exactly in the middle of its button.
export function Chevron({ direction, size = 18 }: { direction: 'left' | 'right'; size?: number }) {
    return (
        <svg viewBox="0 0 16 16" width={size} height={size} aria-hidden="true">
            <path d={direction === 'left' ? 'M10 3L5 8l5 5' : 'M6 3l5 5-5 5'} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

type Props = {
    open: boolean;
    onClose: () => void;
    title: string;
    // Sets the --story-* colours (e.g. almsommer-story)
    className: string;
    slides: Slide[];
};

// A slideshow about one project in a modal dialog: arrows, dots, arrow keys and swiping.
function ProjectStory({ open, onClose, title, className, slides }: Props) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [index, setIndex] = useState(0);
    const touchStart = useRef<{ x: number; y: number } | null>(null);
    const titleId = useId();

    const go = (next: number) => setIndex(Math.max(0, Math.min(slides.length - 1, next)));

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (open && !dialog.open) {
            setIndex(0);
            dialog.showModal();
            document.documentElement.classList.add('has-modal');
        } else if (!open && dialog.open) {
            dialog.close();
        }
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const onKey = (event: KeyboardEvent) => {
            // Leave the keys to a dialog opened inside a slide (e.g. an enlarged card).
            if (dialogRef.current?.querySelector('dialog[open]')) return;
            if (event.key === 'ArrowRight') setIndex((i) => Math.min(slides.length - 1, i + 1));
            if (event.key === 'ArrowLeft') setIndex((i) => Math.max(0, i - 1));
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, slides.length]);

    const handleClose = () => {
        document.documentElement.classList.remove('has-modal');
        onClose();
    };

    return (
        <dialog
            ref={dialogRef}
            className={`project-story ${className}`}
            aria-labelledby={titleId}
            // React passes close events of nested dialogs up to this one, so only react to our own.
            onClose={(event) => event.target === event.currentTarget && handleClose()}
            // A click on the backdrop lands on the dialog element itself.
            onClick={(event) => event.target === event.currentTarget && dialogRef.current?.close()}
        >
            <div className="story-frame">
                <header className="story-header">
                    <span className="story-count">{index + 1} / {slides.length}</span>
                    <h2 id={titleId} className="visually-hidden">{title}</h2>
                    <button type="button" className="story-close" aria-label="Close" onClick={() => dialogRef.current?.close()}>
                        <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
                            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                        </svg>
                    </button>
                </header>

                <div
                    className="story-viewport"
                    onTouchStart={(e) => (touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY })}
                    onTouchEnd={(e) => {
                        const start = touchStart.current;
                        touchStart.current = null;
                        if (!start) return;
                        const dx = e.changedTouches[0].clientX - start.x;
                        const dy = e.changedTouches[0].clientY - start.y;
                        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) go(index + (dx < 0 ? 1 : -1));
                    }}
                >
                    <div className="story-track" style={{ transform: `translateX(${-index * 100}%)` }}>
                        {slides.map((slide, i) => (
                            <section
                                key={slide.title}
                                className={`story-slide${slide.wide ? ' is-wide' : ''}`}
                                aria-roledescription="slide"
                                aria-label={`${i + 1} of ${slides.length}: ${slide.title}`}
                                inert={i !== index}
                            >
                                <div className="story-visual">{open && Math.abs(i - index) <= 1 ? slide.visual(i === index) : null}</div>
                                <div className="story-text">
                                    <p className="story-kicker">{slide.kicker}</p>
                                    <h3>{slide.title}</h3>
                                    {slide.text}
                                </div>
                            </section>
                        ))}
                    </div>
                </div>

                <nav className="story-nav" aria-label="Slides">
                    <button type="button" className="story-arrow" onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous slide">
                        <Chevron direction="left" />
                    </button>
                    <ol className="story-dots">
                        {slides.map((slide, i) => (
                            <li key={slide.title}>
                                <button
                                    type="button"
                                    className={i === index ? 'is-current' : undefined}
                                    aria-current={i === index ? 'step' : undefined}
                                    aria-label={slide.title}
                                    title={slide.title}
                                    onClick={() => go(i)}
                                />
                            </li>
                        ))}
                    </ol>
                    <button type="button" className="story-arrow" onClick={() => go(index + 1)} disabled={index === slides.length - 1} aria-label="Next slide">
                        <Chevron direction="right" />
                    </button>
                </nav>
            </div>
        </dialog>
    );
}

export default ProjectStory;
