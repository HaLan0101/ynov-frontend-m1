import React from 'react';
import styles from "./index.module.scss";
const Index = ({ type, title, handleClick, btnClass }) => {
  return (
    <button type={type} onClick={handleClick} className={`${styles.btn} ${styles[btnClass]}`}>
      {title}
    </button>
  );
}

export default Index;
