import {useEffect, useState,useContext} from 'react';
import { useRouter } from "next/router";
import placeService from '../../../services/place.service';
import bookingService from '../../../services/booking.service';
import styles from "./index.module.scss";
import HeartIcon from "../../../../public/heart-light1.svg";
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
  const { addPlaceWishlist } = useContext(WishlistContext);
  const { removePlaceWishlist } = useContext(WishlistContext);
  const [place, setPlace] = useState();
  const [bookingForm, setBookingForm] = useState({});
  useEffect(() => {
    if (place) {
      setBookingForm({
        dateStart: "",
        dateEnd: "",
        quantity: "",
        owner: `${place.place.owner._id}`,
        place: `${place.place._id}`
      });
    }
  }, [place]);
  const handleInput = (e) => {
    setBookingForm({ ...bookingForm, [e.target.name]: e.target.value })
  }
  const submitForm = (e) => {
    e.preventDefault(e);
    const token = localStorage.getItem('token');
    console.log("date start: "+ bookingForm.dateStart);
    console.log("date end: "+ bookingForm.dateEnd);
    console.log("quanity: "+ bookingForm.quantity);
    console.log("place: "+ bookingForm.place);
    console.log("owner: "+ bookingForm.owner);
    bookingService.createBooking(token, bookingForm)
    .then(booking => {
      router.replace("/myBookings").then(() => router.reload());
    })
    .catch(err => {
      console.log(err);
    })
  }

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
            <h1>{place.place.title}</h1>
            <div className={styles.product__header__info}>
              <ul className={styles.nav__list}>
                <li className={styles.nav__item}>
                  <img src={Star.src} alt="star" />
                  <p className={styles.nav__decor}>{place.place.rating}</p>
                </li>
                <li className={styles.nav__item}><p className={styles.nav__decor}>19 commentaire</p></li>
                <li className={styles.nav__item}>
                  <img src={Medal.src} alt="medal" />
                  <p>Superhôte</p>
                </li>
                <li className={styles.nav__item}><p className={styles.nav__decor}>{place.place.address.street}, {place.place.address.zipCode} {place.place.address.city}</p></li>
              </ul>
              <ul className={styles.nav__list}>
                <li className={styles.nav__item}>
                  <img src={Share.src} alt="share" />
                  <p className={styles.nav__decor}>Partager</p>
                </li>
                <li className={styles.nav__item}>
                    <button
                      className={styles.btn__whishlist}
                      onClick={
                        () => {
                          addPlaceWishlist(place.place);
                          removePlaceWishlist(place.place);
                          toggleHeart()
                        }
                      }
                    >
                      <img src={heart} alt="favoris" />
                    </button>
                    <p className={styles.nav__decor}>Entregistrer</p>
                </li>
              </ul>
            </div>
        </div>
        <div className={styles.product__image}>
            {
            place.place.images && place.place.images.map((item) => (
            <img src={item} key={item}/>
            ))
            }
        </div>
        <div className={styles.product__description}>
          <div className={styles.product__description__left}>
            <div className={styles.product__description__top}>
              <h2>Type : {place.place.types.name}</h2>
              <h2>Chez : {place.place.owner.firstName} {place.place.owner.lastName} </h2>
            </div>  
            <div className={styles.product__description__info}>
              <ul className={styles.nav__list}>
                <li className={styles.nav__item}>{place.place.capacity} voyageurs</li>
                <li className={styles.nav__item}>2 chambres</li>
                <li className={styles.nav__item}>2 lits</li>
                <li className={styles.nav__item}>2 sallle de bain et 1 toilette</li>
              </ul>
            </div>
            <hr />
            <div className={styles.product__description__detail}>
               <div className={styles.detail}>
                  <img src={Home.src} alt="home" />
                  <div>
                    <p className={styles.nav__decor}>Idéal pour le télétravail</p>
                    <p>
                    Une connexion wifi rapide à 418 Mbit/s, plus un espace de travail dans une chambre privée.
                    </p>
                  </div>
               </div>
               <div className={styles.detail}>
                  <img src={Door.src} alt="door" />
                  <div>
                    <p className={styles.nav__decor}>Arrivée autonome</p>
                    <p>
                    Vous pouvez entrer dans les lieux avec une boîte à clé sécurisée.
                    </p>
                  </div>
               </div>
               <div className={styles.detail}>
                  <img src={Medal.src} alt="medal" />
                  <div>
                    <p className={styles.nav__decor}>{place.place.owner.lastName} est Superhôte</p>
                    <p>
                    Les Superhôtes sont des hôtes expérimentés qui bénéficient de très bonnes évaluations et qui s'engagent à offrir d'excellents séjours aux voyageurs.
                    </p>
                  </div>
               </div>
            </div>
            <hr />
            <div className={styles.product__description__airCover}>
              <img src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg" alt="" />
              <p>Chaque réservation comprend une protection gratuite en cas d'annulation par l'hôte, d'inexactitudes dans la description du logement, ainsi que d'autres problèmes comme les difficultés d'accès au logement.</p>
              <p className={styles.nav__decor}>En savoir plus</p>
            </div>
          </div>
          <div className={styles.product__decription__right}>
            <div className={styles.product__description__reservation}>
              <div className={styles.product__price}>{place.place.price} € par nuit</div>
              <form className={styles.form__reservation} onSubmit={(e) => submitForm(e)}>
                <Input
                  titleLabel="Départ"
                  inputType="date"
                  inputPlaceholder="from"
                  inputName="dateStart"
                  inputValue={bookingForm.dateStart || ""}
                  inputOnChange={(e) => {
                    handleInput(e);
                  }}
                  //inputOnChange={(e) => setBookingForm({...bookingForm, dateStart:e.target.value})}
                />
                <Input
                  titleLabel="Arrivée"
                  inputType="date"
                  inputPlaceholder="to"
                  inputName="dateEnd"
                  inputValue={bookingForm.dateEnd || ""}
                  inputOnChange={(e) => {
                    handleInput(e);
                  }}
                  //inputOnChange={(e) => setBookingForm({...bookingForm, dateEnd:e.target.value})}
                />
                <Input
                  titleLabel="Voyageurs"
                  inputType="number"
                  inputPlaceholder="quantity"
                  inputName="quantity"
                  inputValue={bookingForm.quantity || ""}
                  inputOnChange={(e) => {
                    handleInput(e);
                  }}
                  //inputOnChange={(e) => setBookingForm({...bookingForm, quantity:e.target.value})}
                />
                {/* <Input
                  titleLabel="Owner"
                  inputType="text"
                  inputPlaceholder="owner"
                  inputName="owner"
                  inputValue={place.place.owner._id}
                  // inputOnChange={(e) => {
                  //   handleInput(e);
                  // }}
                  //inputOnChange={(e) => setBookingForm({...bookingForm, owner:e.target.value})}
                />
                <Input
                  titleLabel="Place"
                  inputType="text"
                  inputPlaceholder="place"
                  inputName="place"
                  inputValue={place.place._id}
                  // inputOnChange={(e) => {
                  //   handleInput(e);
                  // }}
                  //inputOnChange={(e) => setBookingForm({...bookingForm, place:e.target.value})}
                /> */}
                <Button
                  title="Réserver"
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