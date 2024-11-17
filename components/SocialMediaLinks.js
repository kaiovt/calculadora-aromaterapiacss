import React from 'react';
import styles from '../styles/SocialMediaLinks.module.css';

const SocialMediaLinks = () => {
  return (
    <div className={styles.socialLinks}>
      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
        <i className={`fa fa-facebook ${styles.socialIcon}`} />
      </a>
      <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
        <i className={`fa fa-instagram ${styles.socialIcon}`} />
      </a>
      <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
        <i className={`fa fa-twitter ${styles.socialIcon}`} />
      </a>
    </div>
  );
};

export default SocialMediaLinks;
