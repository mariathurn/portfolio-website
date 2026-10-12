import { useEffect, useState } from 'react';
import { BANNER_DONE_EVENT } from '../events';

type Theme = 'light' | 'dark';

const HINT_SEEN_KEY = 'lever-hint-seen';
const HINT_MS = 3000;

const readStorage = (key: string) => {
    try {
        return localStorage.getItem(key);
    } catch {
        return null;
    }
};

const writeStorage = (key: string, value: string) => {
    try {
        localStorage.setItem(key, value);
    } catch {
        // Storage can be blocked (private mode) – the value then just isn't remembered
    }
};

// index.html sets data-theme before React loads, so there is no flash of the wrong theme
const getInitialTheme = (): Theme =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';

function ThemeLever() {
    const [theme, setTheme] = useState<Theme>(getInitialTheme);
    const [showHint, setShowHint] = useState(false);
    const isDark = theme === 'dark';

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        writeStorage('theme', theme);
    }, [theme]);

    // After the banner intro, wiggle once and show a hint – only on a visitor's first visit
    useEffect(() => {
        let hideTimer: ReturnType<typeof setTimeout>;

        const onBannerDone = () => {
            // Skip if already seen, or if the visitor already found night mode
            if (readStorage(HINT_SEEN_KEY) || document.documentElement.dataset.theme === 'dark') return;
            writeStorage(HINT_SEEN_KEY, 'true');
            setShowHint(true);
            hideTimer = setTimeout(() => setShowHint(false), HINT_MS);
        };

        window.addEventListener(BANNER_DONE_EVENT, onBannerDone);
        return () => {
            window.removeEventListener(BANNER_DONE_EVENT, onBannerDone);
            clearTimeout(hideTimer);
        };
    }, []);

    const toggleTheme = () => {
        setTheme(isDark ? 'light' : 'dark');
        setShowHint(false);
    };

    return (
        <div className="theme-lever-wrap">
            <button
                type="button"
                className={`theme-lever ${isDark ? 'is-dark' : ''} ${showHint ? 'is-hinting' : ''}`}
                onClick={toggleTheme}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                aria-pressed={isDark}
            >
                <svg viewBox="0 0 124 132" aria-hidden="true">
                    {/* Handle, rotates around the top of the base */}
                    <g transform="translate(66 98)">
                        <rect className="theme-lever-handle" x="-15" y="-92" width="30" height="96" rx="9" />
                    </g>
                    {/* Base */}
                    <rect x="6" y="94" width="118" height="38" rx="7" />
                </svg>
            </button>
            {showHint && (
                <p className="theme-lever-hint" role="status">
                    <span aria-hidden="true">🌙</span>
                </p>
            )}
        </div>
    );
}

export default ThemeLever;
