import { useContext,useState, useEffect } from "react";
import { useRouter } from 'next/router';
import styles from "./index.module.scss";
const Index = ({ booking }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/place/"+booking.place._id);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.metadata}>
            <p>Title de place: {booking.place.title}</p>
            <p onClick={handleClick}><b>Lien vers la place</b></p>
            <hr />
            <p>Date de début :  {booking.dateStart}</p>
            <p>Date de fin : {booking.dateEnd}</p>
            <p>Quantity : {booking.quantity}</p>
            <p>Etat : {booking.status}</p>
            <hr />
            <p>Email du proprietaire : {booking.owner.email} </p>
            <p>Email du client : {booking.client.email}</p>
        </div>
      </div>
    </div>
  );
}

export default Index;