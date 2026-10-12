import { useState, useEffect, useRef } from 'react';
import '../styles/Navbar.css';
import mariaName from '../assets/logo-name.png';
import ThemeLever from './ThemeLever';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);

  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);

  // Colour variable per section, so the navbar also follows dark mode
  const sectionColors: Record<string, string> = {
    about: 'var(--color-green)',
    skills: 'var(--color-blue)',
    projects: 'var(--color-red)',
    contact: 'var(--color-rust)',
  };
  const [activeSection, setActiveSection] = useState('about');
  const navColor = sectionColors[activeSection] ?? sectionColors.about;

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("main section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        // Trigger when a section crosses the vertical middle of the viewport,
        // so sections taller than the screen are detected as well.
        rootMargin: "-50% 0px -50% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar"
      aria-label="Main navigation"
      style={{ backgroundColor: navColor }}>
      <div className="navbar-container">

        <div className="navbar-brand">
          <ThemeLever />
          <a href="#about" className="navbar-logo">
            <img
              className="maria-logo"
              src={mariaName}
              alt="Maria Thurn"
            />
          </a>
        </div>

        <ul className="navbar-menu">
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <button
          type="button"
          className="navbar-hamburger"
          onClick={toggleMenu}
          ref={hamburgerRef}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul
          id="mobile-menu"
          className={`navbar-mobile-menu ${isOpen ? 'active' : ''}`}
          style={{ backgroundColor: navColor }}
          ref={menuRef}
        >
          <li><a href="#about" onClick={closeMenu}>About</a></li>
          <li><a href="#skills" onClick={closeMenu}>Skills</a></li>
          <li><a href="#projects" onClick={closeMenu}>Projects</a></li>
          <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
