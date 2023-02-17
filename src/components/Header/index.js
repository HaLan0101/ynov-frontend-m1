import {useContext,useState} from 'react';
import { useRouter } from 'next/router';
import WishlistContext from '../../context/WishlistContext';
import Link from "next/link";
import styles from "./index.module.scss";
import Logo from "../../../public/logo.png";
import Search from "../Search/index";
import Language from "../../../public/language.svg";
import Menu from "../../../public/menu.svg";
import Account from "../../../public/account.svg";
const Index = () => {
  const router = useRouter();
  const { wishlist } = useContext(WishlistContext);
  const [search, setSearch] = useState("");
  
  const handleInput = (e) => {
    setSearch(e.target.value);
  }
  const onClickSubmit = (e) => {
    router.push({ pathname: "/search", query: { "search": `${search}` } });
  }
  console.log(wishlist);

  return (
    <header className={styles.header}>
      <div className={styles.header__main}>
        <div className={styles.header__logo}>
          <Link href="/">
            <img src={Logo.src} alt="Airbnb" />
          </Link>
        </div>
        <div className={styles.header__search}>
          <Search message="Titre....." 
            onChange={(e) => {
              handleInput(e);
            }}
           onClick={onClickSubmit}></Search>
        </div>
        <div className={styles.header__menu}>
          <ul className={styles.nav__list}>
            <li className={styles.nav__item}>
              <button>Mettre mon logement sur Airbnb</button>
            </li>
            <li className={styles.nav__item}>
              <button>
                <img src={Language.src} alt="language" />
              </button>
            </li>
            <li className={styles.nav__item}>
              <button>
                <ul>
                  <li>
                    <img src={Menu.src} alt="menu" />
                  </li>
                  <li>
                    <img src={Account.src} alt="account" />
                  </li>
                </ul>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.header__filter}>
        <ul className={styles.nav__list}>
          <li className={styles.nav__item}>
            <img src="https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg" alt="icon" />
            <p>Tendance</p>
          </li>
          <li className={styles.nav__item}>
            <img src="https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg" alt="icon" />
            <p>Calbanes</p>
          </li>
          <li className={styles.nav__item}>
            <img src="https://a0.muscache.com/pictures/4d4a4eba-c7e4-43eb-9ce2-95e1d200d10e.jpg" alt="icon" />
            <p>Cabanes perchées</p>
          </li>
          <li className={styles.nav__item}>
            <img src="https://a0.muscache.com/pictures/677a041d-7264-4c45-bb72-52bff21eb6e8.jpg" alt="icon" />
            <p>Bord de lac</p>
          </li>
          <li className={styles.nav__item}>
            <img src="https://a0.muscache.com/pictures/6ad4bd95-f086-437d-97e3-14d12155ddfe.jpg" alt="icon" />
            <p>Campagne</p>
          </li>
          <li className={styles.nav__item}>
            <img src="https://a0.muscache.com/pictures/757deeaa-c78f-488f-992b-d3b1ecc06fc9.jpg" alt="icon" />
            <p>Au pied des pistes</p>
          </li>
          <li className={styles.nav__item}>
            <img src="https://a0.muscache.com/pictures/c8e2ed05-c666-47b6-99fc-4cb6edcde6b4.jpg" alt="icon" />
            <p>Luxe</p>
          </li>
          <li className={styles.nav__item}>
            <img src="https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg" alt="icon" />
            <p>Piscines</p>
          </li>
          <li className={styles.nav__item}>
            <img src="https://a0.muscache.com/pictures/89faf9ae-bbbc-4bc4-aecd-cc15bf36cbca.jpg" alt="icon" />
            <p>Dômes</p>
          </li>
          <li className={styles.nav__item}>
            <img src="https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg" alt="icon" />
            <p>Avec vue</p>
          </li>
          <li className={styles.nav__item}>
            <button>hello</button>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Index;