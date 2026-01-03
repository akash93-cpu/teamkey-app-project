import '../src/css/footer-styles.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">

                <div className="footer-section">
                    <h4>Company</h4>
                    <ul>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Press</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Get in Touch</h4>
                    <ul>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Support</a></li>
                        <li><a href="#">Help Center</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Legal</h4>
                    <ul>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms of Service</a></li>
                        <li><a href="#">Cookie Policy</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Follow Us</h4>
                    <ul className="social-links">
                        <li><a href="#">Twitter</a></li>
                        <li><a href="#">LinkedIn</a></li>
                        <li><a href="#">Instagram</a></li>
                    </ul>
                </div>

            </div>

            <div className="footer-bottom">
                © {new Date().getFullYear()} TeamKeys Data. All rights reserved.
            </div>
        </footer>
    );
};


