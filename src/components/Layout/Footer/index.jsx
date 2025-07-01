import { LinkedInIcon, GitHubIcon, YouTubeIcon, FacebookIcon } from '@/components/external/svgs';
import { MongoDBLogo } from '@leafygreen-ui/logo';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.brandSection}>
            <MongoDBLogo color="white" height={40} />
            <p className={styles.brandSubtitle}>
              Powered by MongoDB Vector Search for real-time content analysis and trending insights
            </p>
          </div>

          <div className={styles.linksSection}>
            <div className={styles.linkGroup}>
              <h4 className={styles.linkGroupTitle}>Resources</h4>
              <a 
                href="https://www.mongodb.com/solutions/industries" 
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Industry Solutions
              </a>
              <a 
                href="https://www.mongodb.com/" 
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                MongoDB Main Website
              </a>
            </div>
          </div>

          <div className={styles.socialSection}>
            <h4 className={styles.socialTitle}>Connect with MongoDB</h4>
            <div className={styles.socialLinks}>
              <a 
                href="https://github.com/mongodb" 
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <GitHubIcon />
              </a>
              <a 
                href="https://www.linkedin.com/company/mongodb/" 
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
              <a 
                href="https://www.youtube.com/user/MongoDB" 
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <YouTubeIcon />
              </a>
              <a 
                href="https://www.facebook.com/MongoDB/" 
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.divider}></div>
        
        <p className={styles.copyright}>
          © {currentYear} MongoDB, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
} 