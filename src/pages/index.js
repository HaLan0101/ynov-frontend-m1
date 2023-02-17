import {useEffect, useState} from 'react';
import TitlePage from "../components/TitlePage";
import PlaceGrid from "../components/PlaceGrid";
import placeService from "../services/place.service";
export default function Home() {
  const [places, setPlaces] = useState();
  // const places = [
  //   { id: 1, title: "Wonderfull Villa in Miama", price: 200, rate: 4.99, image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1560&q=80" },
  //   { id: 2, title: "Wonderfull Appartment in Paris", price: 300, rate: 4.99, image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1560&q=80" },
  //   { id: 3, title: "Wonderfull Villa in Barcelona", price: 100, rate: 4.99, image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1560&q=80" }
  // ]
  useEffect(() => {
    placeService.getPlaces()
      .then((place) => {
        console.log(place);
        setPlaces(place);
      })
      .catch(err => console.log(err))
  }, []);

  return (
    <main>
      <TitlePage title="Homepage" />
      <PlaceGrid places={places} />
    </main>
  )
}