import {useEffect, useState,useContext} from 'react';
import { useRouter } from "next/router";
import placeService from '../../../services/place.service';
import styles from "./index.module.scss";
import HeartIcon from "../../../../public/heart-light.svg";
import HeartIconClick from "../../../../public/heart-fill.svg";
import WishlistContext from "../../../context/WishlistContext";
import Star from "../../../../public/star.svg";
import Share from "../../../../public/share.svg";
import Medal from "../../../../public/medal.svg";
import Home from "../../../../public/home.svg";
import Door from "../../../../public/door.svg";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
const Index = () => {
  const [heart, setHeart] = useState(HeartIcon.src);
  const router = useRouter();
  const [place, setPlace] = useState();
  const { addPlaceWishlist } = useContext(WishlistContext);
  const { removePlaceWishlist } = useContext(WishlistContext);

  useEffect(() => {
    if (router.isReady) {
      placeService.getPlace(router.query.id).then((res) => {
          setPlace(res);
      })
  }
  }, [router.isReady])

  const toggleHeart = () =>{
    if(heart === HeartIcon.src){
      setHeart(HeartIconClick.src)
    }
    else{
      setHeart(HeartIcon.src)
    }
  }

  return (
    place && (
      <>
      <div className={styles.product__detail}>
        <div className={styles.product__header}>
            <h1>{place.title}</h1>
            <div className={styles.product__header__info}>
              <ul className={styles.nav__list}>
                <li className={styles.nav__item}>
                  <img src={Star.src} alt="star" />
                  <p>{place.rating}</p>
                </li>
                <li className={styles.nav__item}>19 commentaires</li>
                <li className={styles.nav__item}>
                  <img src={Medal.src} alt="medal" />
                  <p>Superhôte</p>
                </li>
                <li className={styles.nav__item}>{place.address.street}, {place.address.zipCode} {place.address.city}</li>
              </ul>
              <ul className={styles.nav__list}>
                <li className={styles.nav__item}>
                  <img src={Share.src} alt="share" />
                  <p>Partager</p>
                </li>
                <li className={styles.nav__item}>
                  <button
                    className={styles.btn__whishlist}
                    onClick={
                      () => {
                        addPlaceWishlist(place);
                        removePlaceWishlist(place);
                        toggleHeart()
                      }
                    }
                  >
                    <img src={heart} alt="favoris" />
                  </button>
                  <p>Entregistrer</p>
                </li>
              </ul>
            </div>
            {/* {
            place.images && place.images.map((item) => (
            <img src={item} key={item}/>
            ))
            } */}
        </div>
        <div className={styles.product__description}>
          <div className={styles.product__left}>
            <div className={styles.product__header}>
              <h2>{place.types}</h2>
              <h2>Chez {place.owner}</h2>
            </div>  
            <div className={styles.product__info}>
              <ul className={styles.nav__list}>
                <li className={styles.nav__item}>{place.capacity}</li>
                <li className={styles.nav__item}>2 chambres</li>
                <li className={styles.nav__item}>2 lits</li>
                <li className={styles.nav__item}>2 sallle de bain et 1 toilette</li>
              </ul>
            </div>
            <hr />
            <div className={styles.product__detail}>
               <div className={styles.detail2}>
                  <img src={Home.src} alt="home" />
                  <p>
                  Idéal pour le télétravail
                  Une connexion wifi rapide à 418 Mbit/s, plus un espace de travail dans une chambre privée.
                  </p>
               </div>
               <div className={styles.detail2}>
                  <img src={Door.src} alt="door" />
                  <p>
                  Arrivée autonome
                  Vous pouvez entrer dans les lieux avec une boîte à clé sécurisée.
                  </p>
               </div>
               <div className={styles.detail2}>
                  <img src={Medal.src} alt="medal" />
                  <p>
                  {place.owner} est Superhôte
                  Les Superhôtes sont des hôtes expérimentés qui bénéficient de très bonnes évaluations et qui s'engagent à offrir d'excellents séjours aux voyageurs.
                  </p>
               </div>
            </div>
          </div>
          <div className={styles.product__righ}>
            <div className={styles.product__reservation}>
              <div className={styles.product__price}>{place.price} €</div>
              <form className={styles.form__reservation}>
                <Input
                  titleLabel="From"
                  inputType="date"
                  inputPlaceholder="from"
                  inputName="from"
                  // inputValue={userForm.email || ""}
                  // inputOnChange={(e) => {
                  //   handleInput(e);
                  // }}
                />
                <Input
                  titleLabel="To"
                  inputType="date"
                  inputPlaceholder="to"
                  inputName="to"
                  // inputValue={userForm.password || ""}
                  // inputOnChange={(e) => {
                  //   handleInput(e);
                  // }}
                />
                <Button
                  title="Réserver"
                  // handleClick={(e) => {
                  //   submitForm(e);
                  // }}
                  type="submit"
                  btnClass="btn__pink"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
      </>
      )
  );
}

export default Index;