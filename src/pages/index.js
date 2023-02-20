import {useEffect, useState} from 'react';
import TitlePage from "../components/TitlePage";
import PlaceGrid from "../components/PlaceGrid";
import placeService from "../services/place.service";
export default function Home() {
  const [places, setPlaces] = useState();
  useEffect(() => {
    placeService.getPlaces()
      .then((place) => {
        console.log(place);
        setPlaces(place);
      })
      .catch(err => console.log(err))
  }, []);

  return (
    <>
      <main>
        <TitlePage title="Homepage" />
        <PlaceGrid places={places} />
      </main>
    </>
  )
}