import '../styles/Contact.css';

function Contact() {
    return (
        <section id='contact' className='contact' style={{ backgroundColor: "#AB5135" }}>
            <h1>Contact</h1>
            <h2>Let's meet!</h2>
            <div className='contact-ways'>
                <a href="mailto:mariathurn@web.de">Email me</a>
                <a href="https://www.linkedin.com/in/maria-thurn-134421142/" target="_blank">Linkedin</a>
                <a href="https://letterboxd.com/dansktysk/" target="_blank">letterboxed</a>
            </div>
            <footer>© 2026 Maria Thurn. All rights reserved.</footer>
        </section >
    );
}

export default Contact;