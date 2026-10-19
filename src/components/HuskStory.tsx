import { useEffect, useState } from 'react';
import '../styles/HuskStory.css';
import ProjectStory, { type Slide } from './ProjectStory';
import homeLight from '../assets/husk/home-en-light.webp';
import homeDark from '../assets/husk/home-en-dark.webp';
import homeGerman from '../assets/husk/home-de-light.webp';
import reviewFront from '../assets/husk/review-front-en-light.webp';
import reviewBack from '../assets/husk/review-back-en-light.webp';
import grammar from '../assets/husk/grammar-en-light.webp';
import grammarAnswer from '../assets/husk/grammar-answer-en-light.webp';
import grammarAnswerDark from '../assets/husk/grammar-answer-en-dark.webp';
import crossword from '../assets/husk/crossword-en-light.webp';

function Phone({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
    return <img className={`husk-phone ${className}`} src={src} alt={alt} loading="lazy" />;
}

// A review card that turns over: once by itself when the slide opens, then on click.
function FlipPhone({ active }: { active: boolean }) {
    const [flipped, setFlipped] = useState(false);

    useEffect(() => {
        if (!active) return;
        const timer = window.setTimeout(() => setFlipped(true), 1200);
        return () => {
            window.clearTimeout(timer);
            setFlipped(false);
        };
    }, [active]);

    return (
        <div className="husk-flip-wrap">
            <button
                type="button"
                className={`husk-flip${flipped ? ' is-flipped' : ''}`}
                onClick={() => setFlipped((f) => !f)}
                aria-label={flipped ? 'Show the question side' : 'Show the answer side'}
            >
                <img className="husk-phone husk-flip-front" src={reviewFront} alt="A review card showing the Danish word “at lege”" />
                <img className="husk-phone husk-flip-back" src={reviewBack} alt="The answer side: “to play”, with Wrong and Right buttons" />
            </button>
            <p className="husk-caption">{flipped ? 'Be honest: Right or Wrong.' : 'One word, one card.'} Tap the phone to turn it.</p>
        </div>
    );
}

const levels = ['A1', 'A2', 'B1'];

// The course: ten-word lessons fill up, and the next level opens at 90 %.
function CourseLadder({ active }: { active: boolean }) {
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (!active) return;
        const timer = window.setInterval(() => setStep((s) => (s >= 12 ? s : s + 1)), 260);
        return () => {
            window.clearInterval(timer);
            setStep(0);
        };
    }, [active]);

    // Ten lessons of A1; at nine (90 %) A2 opens.
    const lessonsDone = Math.min(step, 10);

    return (
        <div className="husk-course">
            {levels.map((level, i) => {
                const open = i === 0 || (i === 1 && lessonsDone >= 9);
                return (
                    <div key={level} className={`husk-level${open ? ' is-open' : ''}`}>
                        <span className="husk-level-name">{level}</span>
                        <div className="husk-lessons" aria-hidden="true">
                            {Array.from({ length: 10 }, (_, lesson) => (
                                <span key={lesson} className={i === 0 && lesson < lessonsDone ? 'is-done' : undefined} />
                            ))}
                        </div>
                        <span className="husk-level-state">{open ? 'open' : 'locked'}</span>
                    </div>
                );
            })}
            <p className="husk-caption">Each dot is a lesson of ten words. At 90 % the next level opens.</p>
            <div className="husk-directions">
                <span>Danish → English</span>
                <span className="husk-directions-arrow">mastered ⟶</span>
                <span>English → Danish</span>
            </div>
        </div>
    );
}

const slides: Slide[] = [
    {
        kicker: 'Learn Danish, one card at a time',
        title: 'Husk',
        visual: () => <Phone src={homeLight} alt="The Husk home screen with cards due in both directions and a forecast of the coming week" />,
        text: (
            <>
                <p>
                    Husk (Danish for "remember") is a vocabulary app for anyone learning Danish. A few minutes a day are
                    enough: Husk shows you each word right before you would forget it, so your daily reviews stay short
                    and what you learn sticks.
                </p>
                <p>
                    The home screen shows your streak, the cards due in both directions, a forecast of the coming week,
                    and how many words are new, known or mastered.
                </p>
                <p className="story-badge">Currently in development</p>
            </>
        ),
    },
    {
        kicker: 'Spaced repetition',
        title: 'Reviews that adapt to you',
        visual: (active) => <FlipPhone active={active} />,
        text: (
            <>
                <p>
                    Behind every card is FSRS, a modern memory model. It works out from your answers how well you know
                    each word and schedules the next review accordingly. Easy words come back rarely, difficult ones more
                    often.
                </p>
                <p>
                    Every word comes with a pronunciation recording – Danish pronunciation has a reputation for a
                    reason.
                </p>
            </>
        ),
    },
    {
        kicker: 'A structured course',
        title: 'From A1 to B1',
        visual: (active) => <CourseLadder active={active} />,
        text: (
            <>
                <p>
                    More than 3,400 words, sorted into the CEFR levels A1, A2 and B1 and split into short lessons of ten
                    words. A new lesson opens once you have learned the previous one, and a new level once you know 90 %
                    of the current one.
                </p>
                <p>
                    You start by recognising words (Danish → English). Once a word is truly mastered, its reverse card
                    joins your deck automatically, so you learn to use the word, not just understand it.
                </p>
                <p className="husk-credit">The word list is based on the Kelly project (CC BY-NC-SA 2.0).</p>
            </>
        ),
    },
    {
        kicker: 'Grammar',
        title: 'Verb drills in real sentences',
        visual: () => (
            <div className="husk-phones">
                <Phone src={grammar} alt="Grammar drill: “Jeg ___ træt i dag.” with four verb forms to choose from" />
                <Phone src={grammarAnswer} alt="The answer: “er” is right, with immediate feedback" />
            </div>
        ),
        text: (
            <>
                <p>
                    Fill-in-the-blank exercises with real example sentences train the verb forms – present, past and
                    perfect – of the verbs you have already met in your vocabulary.
                </p>
                <p>Which form fits? Pick one and get immediate feedback with the correct answer.</p>
            </>
        ),
    },
    {
        kicker: 'Something different',
        title: 'A crossword of your own words',
        visual: () => <Phone src={crossword} alt="A crossword built from learned words, with clues across and down" />,
        text: (
            <>
                <p>
                    Once you have learned enough words, Husk builds a crossword from them – a relaxed alternative to
                    card reviews, made only of words you already know.
                </p>
                <p>Check your answers or reveal a letter when you're stuck.</p>
            </>
        ),
    },
    {
        kicker: 'Details',
        title: 'Light, dark, English, German',
        visual: () => (
            <div className="husk-phones is-trio">
                <Phone src={homeDark} alt="The home screen in dark mode" />
                <Phone src={grammarAnswerDark} alt="A grammar drill in dark mode" />
                <Phone src={homeGerman} alt="The home screen in German" />
            </div>
        ),
        text: (
            <>
                <p>
                    Husk works offline, has a light and a dark mode, and its interface and translations are available
                    in English and German.
                </p>
                <p>
                    Next up: polishing, testing and the first public release for Android and iOS.
                </p>
            </>

        ),
    },
];

type Props = {
    open: boolean;
    onClose: () => void;
};

function HuskStory({ open, onClose }: Props) {
    return <ProjectStory open={open} onClose={onClose} title="Husk" className="husk-story" slides={slides} />;
}

export default HuskStory;
