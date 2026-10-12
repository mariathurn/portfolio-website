import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

// index.html sets data-theme before React loads, so there is no flash of the wrong theme
const getInitialTheme = (): Theme =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';

function ThemeLever() {
    const [theme, setTheme] = useState<Theme>(getInitialTheme);
    const isDark = theme === 'dark';

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        try {
            localStorage.setItem('theme', theme);
        } catch {
            // Storage can be blocked (private mode) – the theme then just isn't remembered
        }
    }, [theme]);

    return (
        <button
            type="button"
            className={`theme-lever ${isDark ? 'is-dark' : ''}`}
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
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
    );
}

export default ThemeLever;
