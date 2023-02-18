import {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import TitlePage from "../../components/TitlePage";
import PlaceGrid from "../../components/PlaceGrid";
import placeService from "../../services/place.service";
const Index = () => {
    const router = useRouter();
    const [places, setPlaces] = useState();
    const { filter } = router.query;
    console.log("here : "+filter)
    useEffect(() => {
        placeService.getFilter(filter)
        .then((place) => {
            setPlaces(place);
        })
        .catch(err => console.log(err))
    }, [filter]);

  return (
    <main>
        <TitlePage title="Filter" />
        <PlaceGrid places={places} />
    </main>
  )
}
export default Index;