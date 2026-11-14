import cv from '../assets/about/CV.pdf';
import ThemeToggle from './ThemeToggle';
import { ArrowLeft } from './Icons';

type Props = {
    // Home: section links. Other pages: a link back to the projects.
    page: 'home' | 'sub';
};

function SiteHeader({ page }: Props) {
    return (
        <header className="site-header">
            <nav className="container site-nav" aria-label="Main">
                <a className="site-name" href={page === 'home' ? '#top' : '/'}>Maria Thurn</a>
                <div className="site-nav-links">
                    {page === 'home' ? (
                        <>
                            <a href="#work">Work</a>
                            <a href="#about">About</a>
                            <a href="#contact">Contact</a>
                        </>
                    ) : (
                        <a href="/#work"><ArrowLeft /> All projects</a>
                    )}
                    <a className="btn btn--secondary btn--sm site-nav-cv" href={cv} target="_blank" rel="noopener noreferrer">CV (PDF)</a>
                    <ThemeToggle />
                </div>
            </nav>
        </header>
    );
}

export default SiteHeader;
