import {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import bookingService from '../../../services/booking.service';
import styles from "./index.module.scss";
import BookingCard from "../../../components/BookingCard";
import WithAdmin from '../../../HOC/WithAdmin';
import TitlePage from "../../../components/TitlePage";
const Index = () => {
  const [bookings, setBookings] = useState();

  useEffect(() => {
    const token = localStorage.getItem('token');
    bookingService.getBookings(token)
      .then((bookings) => {
          setBookings(bookings);
      })
      .catch(err => console.log(err))
  }, []);
  return (
    <>
        <div className={styles.myBookings}>
          <TitlePage title="Liste des réservations"/>
          <div className={styles.grid}>
            {
              bookings && bookings.map((item) => (
                <BookingCard key={item._id} booking={item} />
              ))
            }
          </div>
        </div>
    </>
  );
}

export default WithAdmin(Index);