import {useEffect, useState} from 'react';
import TitlePage from "../../components/TitlePage";
import bookingService from "../../services/booking.service";
import styles from "./index.module.scss";
import WithOwner from '../../HOC/WithOwner';
import BookingCard1 from "../../components/BookingCard1"
const Index = () => {
    const [bookings, setBookings] = useState();

    useEffect(() => {
      const token = localStorage.getItem('token');
      bookingService.getMyBookingsOwner(token)
      .then((bookings) => {
          setBookings(bookings);
      })
      .catch(err => console.log(err))
    }, []);
  return (
    <>
          <div className={styles.myBookings}>
              <TitlePage title="Mes places réservées" />
              <div className={styles.grid}>
                {
                  bookings && bookings.map((item) => (
                    <BookingCard1 key={item._id} booking={item} />  
                  ))
                }
              </div>
          </div>
        
  </>
  )
}
export default WithOwner(Index);