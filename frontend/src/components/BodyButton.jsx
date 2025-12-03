import React from 'react';
import styles from './BodyButton.module.css';

function BodyButton({ children, className = '', ...props }) {
  return (
    <button className={`${styles.bodyButton} ${className}`} {...props}>
      {children}
    </button>
  );
}

export default BodyButton; 