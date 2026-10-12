import '../styles/Contact.css';

function Contact() {
    return (
        <section id='contact' className='contact'>
            <h2 className="section-title">Contact</h2>
            <div className='contact-content'>
                <p className='contact-tagline'>Let's meet!</p>
                <p className='contact-text'>Open to frontend developer roles in Copenhagen and remote.</p>
                <div className='contact-ways'>
                    <a className="button button-primary" href="mailto:mail@mariathurn.de">Email me</a>
                    <a className="button button-secondary" href="https://www.linkedin.com/in/maria-thurn-134421142/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </div>
            </div>
            <footer className='contact-footer'>
                <p>© 2026 Maria Thurn</p>
                <p>
                    Off duty: <a href="https://letterboxd.com/dansktysk/" target="_blank" rel="noopener noreferrer">my film diary on Letterboxd</a>
                </p>
            </footer>
        </section>
    );
}

export default Contact;
