import {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import TitlePage from "../../components/TitlePage";
import placeService from "../../services/place.service";
import bookingService from "../../services/booking.service";
import styles from "./index.module.scss";
import Link from "next/link";
import WithAuth from '../../HOC/WithAuth';
const Index = () => {
    const router = useRouter();
    const [bookings, setBookings] = useState();
    useEffect(() => {
      const token = localStorage.getItem('token');
      bookingService.getMyBookings(token)
      .then((bookings) => {
          setBookings(bookings);
      })
      .catch(err => console.log(err))
    }, []);
  return (
    <>
          <div className={styles.myBookings}>
              <TitlePage title="Mes réservations" />
              <div className={styles.grid}>
                {
                  bookings && bookings.map((booking) => (
                    <div className={styles.wrapper} key={booking._id}>
                        <div className={styles.content}>
                            <div className={styles.metadata}>
                                <p>Title de place: {booking.place.title}</p>
                                <p><b><Link href={`/place/${booking.place._id}`} style={{ textDecoration: 'none', color: 'black'}}>Lien vers la place</Link></b></p>
                                <p>Email du proprietaire : {booking.owner.email}</p>
                                <hr />
                                <p>Date de début :  {booking.dateStart}</p>
                                <p>Date de fin : {booking.dateEnd}</p>
                                <p>Quantity : {booking.quantity}</p>
                                <p>Etat : {booking.status}</p>
                            </div>
                        </div>
                    </div>
                    
                  ))
                }
              </div>
          </div>
        
  </>
  )
}
export default WithAuth(Index);