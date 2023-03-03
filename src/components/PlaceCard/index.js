import { useContext,useState } from "react";
import { useRouter } from 'next/router';
import styles from "./index.module.scss";
import HeartIcon from "../../../public/heart-light.svg";
import HeartIconClick from "../../../public/heart-fill.svg";
import WishlistContext from "../../context/WishlistContext";
import Star from "../../../public/star.svg";
const Index = ({ place }) => {
  const [heart, setHeart] = useState(HeartIcon.src);
  const { addPlaceWishlist } = useContext(WishlistContext);
  const { removePlaceWishlist } = useContext(WishlistContext);
  const router = useRouter();

  const handleClick = () => {
    router.push("/place/"+place._id);
  };
  const toggleHeart = () =>{
    if(heart === HeartIcon.src){
      setHeart(HeartIconClick.src)
    }
    else{
      setHeart(HeartIcon.src)
    }
  }
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.overlay} onClick={handleClick}></div>
      <div className={styles.thumbnail__wrapper}>
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
        {
        place.images && place.images.map((item) => (
        <img src={item} key={item}/>
        ))
        }
      </div>
      <div className={styles.content}>
        <div className={styles.metadata}>
          <div className={styles.metadata__left}>
            <p><b>{place.address.street}, {place.address.city} </b></p>
            <p>{place.title}</p>
            <p><b>{place.price}</b> € par nuit</p>
          </div>
          <div className={styles.metadata__right}>
                <img src={Star.src} alt="star" />
                <p>{place.rating}</p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Index;