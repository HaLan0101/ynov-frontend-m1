import {useEffect, useState} from 'react';
import TitlePage from "../../components/TitlePage";
import PlaceGrid from "../../components/PlaceGrid";
import WithAuth from '../../HOC/WithAuth';
import styles from "./index.module.scss";
const Index = () => {
  const [places, setPlaces] = useState();
  useEffect(() => {
    setPlaces(JSON.parse(localStorage.getItem("wishlist")) || []);
  }, []);

  return (
    <>
      <div className={styles.wrapper}>
        <TitlePage title="WishList" />
        <PlaceGrid places={places} />
      </div>
    </>
  )
}
export default WithAuth(Index);