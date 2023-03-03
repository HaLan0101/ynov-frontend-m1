import { useContext,useState, useEffect } from "react";
import { useRouter } from 'next/router';
import styles from "./index.module.scss";
import Link from "next/link";
import Button from "../Button";
import bookingService from "../../services/booking.service";
const Index = ({ booking }) => {
  const router = useRouter();
  const [accepted, setAccepted] = useState({
    status: "ACCEPTED"
  });
  const [cancelled, setCancelled] = useState({
    status: "CANCELLED"
  });

  const submitAccept = (e) => {
    e.preventDefault(e);
    const token = localStorage.getItem('token');
    bookingService.updateBooking(token, accepted, booking._id)
    .then(booking => {
      setAccepted(booking);
      router.replace("/myBookingsOwner").then(() => router.reload());
    })
    .catch(err => console.log(err))
  }

  const submitCancel = (e) => {
    e.preventDefault(e);
    const token = localStorage.getItem('token');
    bookingService.updateBooking(token, cancelled, booking._id)
    .then(booking => {
      setCancelled(booking);
      router.replace("/myBookingsOwner").then(() => router.reload());
    })
    .catch(err => console.log(err))
  }

  return (
    <div className={styles.wrapper} key={booking._id}>
      <div className={styles.content}>
          <div className={styles.metadata}>
              <p>Title de place: {booking.place.title}</p>
              <p><b><Link href={`/place/${booking.place._id}`} style={{ textDecoration: 'none', color: 'black'}}>Lien vers la place</Link></b></p>
              <p>Email du client : {booking.client.email}</p>
              <hr />
              <p>Date de début :  {booking.dateStart}</p>
              <p>Date de fin : {booking.dateEnd}</p>
              <p>Quantity : {booking.quantity}</p>
              <p>Etat : {booking.status}</p>
          </div>
          <Button title="Annuler" type="button" btnClass="btn__black" handleClick={(e) => submitCancel(e)}></Button>
          <Button title="Accepter" type="button" btnClass="btn__white" handleClick={(e) => submitAccept(e)}></Button>
      </div>
  </div>
  );
}

export default Index;