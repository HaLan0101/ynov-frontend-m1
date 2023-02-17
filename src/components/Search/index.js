import React from 'react';
import styles from "./index.module.scss";
import Link from "next/link";
import Search from "../../../public/search.svg";
const Index = (props) => {
    return (
        <div>
            <div className={styles.search__box} >
                <input className={styles.search__input} type="text" placeholder={props.message} onChange={props.onChange} />
                <div className={styles.search__icon} onClick={props.onClick}>
                    <img src={Search.src} alt="search" />
                </div>
            </div>
        </div>
    );
}

export default Index;
