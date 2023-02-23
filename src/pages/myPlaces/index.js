import {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import TitlePage from "../../components/TitlePage";
import PlaceGrid from "../../components/PlaceGrid";
import placeService from "../../services/place.service";
import styles from "./index.module.scss";
import WithAuth from '../../HOC/WithAuth';
import userService from '../../services/user.service';
import PlaceCard1 from "../../components/PlaceCard1";
const Index = () => {
    const router = useRouter();
    const [places, setPlaces] = useState();
    const [owner, setOwner] = useState();
    useEffect(() => {
      const token = localStorage.getItem('token');
      placeService.getMyPlaces(token)
      .then((place) => {
          setPlaces(place);
      })
      .catch(err => console.log(err))
    }, []);
    useEffect(() => {
      const token = localStorage.getItem('token');
      userService.getMe(token)
        .then((user) => {
          if(user.type == "OWNER"){
            setOwner(user);
          }
          else{
            router.push("/");
          }
        })
        .catch(err => console.log(err))
    }, []);
  return (
    <>
    {
      owner && (
        <>
          <div className={styles.myPlaces}>
              <TitlePage title="Mes announces" />
              <div className={styles.grid}>
                {
                  places && places.map((item) => (
                    <PlaceCard1 key={item._id} place={item} />
                  ))
                }
              </div>
          </div>
        </>
    )
    }
  </>
  )
}
export default WithAuth(Index);