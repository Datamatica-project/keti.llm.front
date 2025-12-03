import React from "react";
import styles from "./HeaderButton.module.css";

function HeaderButton({ children, className = "", ...props }) {
  return (
    <button className={`${styles.headerButton} ${className}`} {...props}>
      {children}
    </button>
  );
}

export default HeaderButton;
