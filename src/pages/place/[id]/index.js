import {useEffect, useState} from 'react';
import { useRouter } from "next/router";
import placeService from '../../../services/place.service';
import styles from "./index.module.scss";
const Index = () => {
  
  const router = useRouter();
  const [place, setPlace] = useState();

  useEffect(() => {
    if (router.isReady) {
      placeService.getPlace(router.query.id).then((res) => {
          setPlace(res);
      })
  }
  }, [router.isReady])

  return (
    place && (
      <>
         <div className={styles.product__header}>
            <p>{place.title}</p>
          </div>
      </>
      )
  );
}

export default Index;