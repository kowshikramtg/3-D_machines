import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Left Side: Brand & Address */}
                <div className={styles.brandSection}>
                    <div className={styles.logo}>
                        <span className={styles.logoSmart}>Smart</span>
                        <span className={styles.logoPredict}>Predict</span>
                    </div>
                    <address className={styles.address}>
                        JSS Boys Hostel, Vishnuvardhana Road,<br />
                        Uttarahalli, Kengeri, Bengaluru - 560060<br />
                        Karnataka
                    </address>
                    <div className={styles.contactUs}>
                        <h4>Contact Us</h4>
                        <div className={styles.socialIcons}>
                            <a href="#" className={styles.linkedin} aria-label="LinkedIn"><i className="ph-fill ph-linkedin-logo"></i></a>
                            <a href="#" className={styles.x} aria-label="X"><i className="ph-fill ph-x-logo"></i></a>
                            <a href="#" className={styles.github} aria-label="GitHub"><i className="ph-fill ph-github-logo"></i></a>
                            <a href="#" className={styles.medium} aria-label="Medium"><i className="ph-fill ph-medium-logo"></i></a>
                            <a href="#" className={styles.instagram} aria-label="Instagram"><i className="ph-fill ph-instagram-logo"></i></a>
                        </div>
                    </div>
                    <div className={styles.copyright}>
                        &copy; 2025 SmartPredict. All rights reserved.
                    </div>
                </div>

                {/* Middle Section: Links */}
                <div className={styles.linksGrid}>
                    <div className={styles.linkColumn}>
                        <h3>SMARTPREDICT</h3>
                        <ul>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Pricing</a></li>
                            <li><a href="#">Help & Support</a></li>
                        </ul>
                    </div>
                    <div className={styles.linkColumn}>
                        <h3>SERVICES</h3>
                        <ul>
                            <li><a href="#">EV Battery</a></li>
                            <li><a href="#">Electric Motor</a></li>
                            <li><a href="#">Compressor Pump</a></li>
                            <li><a href="#">Server UPS</a></li>
                            <li><a href="#">Conveyor</a></li>
                            <li><a href="#">Hydraulic System</a></li>
                            <li className={styles.version}>Version 0.0.2</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Tagline */}
            <div className={styles.bottomBar}>
                <span>@SmartPredict | 2025 | </span>
                <span className={styles.highlight}>DriveX</span>
            </div>
        </footer>
    );
};

export default Footer;
