import React from 'react';
import styles from "./index.module.scss";

const Index = (props) => {
  return (
    <div className={styles.input__wrapper}>
      <label>{props.titleLabel}</label>
      <input
        type={props.inputType}
        placeholder={props.inputPlaceholder}
        name={props.inputName}
        value={props.inputValue}
        onChange={props.inputOnChange}
      />
    </div>
  );
}

export default Index;