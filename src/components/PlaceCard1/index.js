import { useContext,useState } from "react";
import { useRouter } from 'next/router';
import styles from "./index.module.scss";
import Button from "../../components/Button";
const Index = ({ place }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/place/"+place._id);
  };
  
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.overlay} onClick={handleClick}></div>
      <div className={styles.thumbnail__wrapper}>
        {
        place.images && place.images.map((item) => (
        <img src={item} key={item}/>
        ))
        }
        {/* <img src={place.images} alt={place.title} /> */}
      </div>
      <div className={styles.content}>
        <div className={styles.metadata}>
            <p><b>{place.address.street}, {place.address.city} </b></p>
            <p>{place.title}</p>
            <p><b>{place.price}</b> € par nuit</p>
        </div>
        <Button
              title="Modifier"
              //handleClick={(e) => showPopUp(e)}
              type="button"
              btnClass="btn__pink"
          />
        <Button
            title="Supprimer"
            //handleClick={(e) => showPopUp(e)}
            type="button"
            btnClass="btn__black"
        />
      </div>
    </div>
  );
}

export default Index;