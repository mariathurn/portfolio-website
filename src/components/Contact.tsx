import { GITHUB_URL, LINKEDIN_URL } from '../links';
import { ExternalArrow } from './Icons';

// Contact on the home page; the other pages get only the bottom line (SiteFooter)
function Contact() {
    return (
        <footer id="contact" className="contact" aria-labelledby="contact-title">
            <div className="container contact-inner">
                <h2 id="contact-title" className="contact-title">Let’s talk.</h2>
                <p className="lead">Open to developer roles in Copenhagen and remote.</p>
                <div className="button-row">
                    <a className="btn btn--primary" href="mailto:mail@mariathurn.de">mail@mariathurn.de</a>
                    <a className="btn btn--secondary" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">LinkedIn <ExternalArrow /></a>
                    <a className="btn btn--secondary" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub <ExternalArrow /></a>
                </div>
                <FooterLine />
            </div>
        </footer>
    );
}

export function FooterLine() {
    return (
        <div className="footer-line">
            <span>© 2026 Maria Thurn</span>
            <div className="footer-links">
                <a href="https://www.artstation.com/mariathurn" target="_blank" rel="noopener noreferrer">Older artwork on ArtStation <ExternalArrow size={14} /></a>
                <a href="/datenschutz.html">Datenschutz</a>
            </div>
        </div>
    );
}

export function SiteFooter() {
    return (
        <footer className="site-footer">
            <div className="container">
                <FooterLine />
            </div>
        </footer>
    );
}

export default Contact;
