import { useContext } from "react";
import styles from "./index.module.scss";
import HearthIcon from "../../../public/heart-light.svg";
import WishlistContext from "../../context/WishlistContext";

const Index = ({ place }) => {

  const { addPlaceWishlist } = useContext(WishlistContext);
  const { removePlaceWishlist } = useContext(WishlistContext);
  return (
    <div className={styles.wrapper}>
      <div className={styles.thumbnail__wrapper}>
        <button
          className={styles.btn__whishlist}
          onClick={
            () => {
              addPlaceWishlist(place);
              removePlaceWishlist(place);
            }
          }
        >
          <img src={HearthIcon.src} alt="favoris" />
        </button>
        <img src={place.images} alt={place.title} />
      </div>
      <div className={styles.content}>
        <div className={styles.metadata}>
          <p>{place.title}</p>
          <p><b>{place.price}</b> € / nuit</p>
        </div>
        {/* <div className={styles.rate}>
          <span>{place.rate}</span>
        </div> */}
      </div>
    </div>
  );
}

export default Index;