import React from 'react';
import styles from "./index.module.scss";
const Index = (props) => {
    return (
        <button type={props.type} className={props.btnClass} onClick={props.handleClick}>
             {props.title}
        </button>
    );
}

export default Index;
