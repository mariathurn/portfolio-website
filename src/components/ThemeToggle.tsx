import { useEffect, useState } from 'react';
import { Moon, Sun } from './Icons';

type Theme = 'light' | 'dark';

// Same key as public/theme-init.js, which applies the theme before React loads
const STORAGE_KEY = 'theme';
const DEVICE_DARK = '(prefers-color-scheme: dark)';

const savedTheme = (): Theme | null => {
    try {
        const value = localStorage.getItem(STORAGE_KEY);
        return value === 'light' || value === 'dark' ? value : null;
    } catch {
        return null;
    }
};

const getInitialTheme = (): Theme => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');

function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>(getInitialTheme);
    const isDark = theme === 'dark';

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
    }, [theme]);

    // Until the visitor picks a theme, follow the device when it switches
    useEffect(() => {
        const query = window.matchMedia(DEVICE_DARK);
        const onChange = () => {
            if (!savedTheme()) setTheme(query.matches ? 'dark' : 'light');
        };
        query.addEventListener('change', onChange);
        return () => query.removeEventListener('change', onChange);
    }, []);

    const toggle = () => {
        const next: Theme = isDark ? 'light' : 'dark';
        try {
            localStorage.setItem(STORAGE_KEY, next);
        } catch {
            // Storage blocked (private mode): the choice lasts for this page only
        }
        setTheme(next);
    };

    return (
        <button type="button" className="theme-toggle" onClick={toggle} aria-label="Dark mode" aria-pressed={isDark}>
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    );
}

export default ThemeToggle;
