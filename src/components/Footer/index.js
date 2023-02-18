import React from 'react';
import styles from "./index.module.scss";
import Language from "../../../public/language.svg";
import Arrow from "../../../public/arrow.svg";
const Index = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__main}>
        <div className={styles.footer__left}>
          <ul className={styles.footer__list}>
            <li className={styles.footer__item}>
            © 2023 Airbnb, Inc.
            </li>
            <li className={styles.footer__item}>
            Confidentialité
            </li>
            <li className={styles.footer__item}>
            Conditions générales
            </li>
            <li className={styles.footer__item}>
            Plan du site
            </li>
            <li className={styles.footer__item}>
            Fonctionnement du site
            </li>
            <li className={styles.footer__item}>
            Infos sur l'entreprise
            </li>
            <li className={styles.footer__item}>
            Destinations
            </li>
          </ul>
        </div>
        <div className={styles.footer__right}>
          <ul className={styles.footer__list}>
              <li className={styles.footer__item}>
                  <img src={Language.src} alt="language" />
                  <p>Français (FR)</p>
              </li>
              <li className={styles.footer__item}>
                  <p>€ EUR</p>
              </li>
              <li className={styles.footer__item}>
                <p>Assistance et ressources</p>
                <img src={Arrow.src} alt="arrow" />
              </li>
            </ul>
        </div>
      </div>
    </footer>
  );
}

export default Index;