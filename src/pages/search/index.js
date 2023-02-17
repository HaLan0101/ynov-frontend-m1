import {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import TitlePage from "../../components/TitlePage";
import PlaceGrid from "../../components/PlaceGrid";
import placeService from "../../services/place.service";
const Index = () => {
    const router = useRouter();
    const [places, setPlaces] = useState();
    const { search } = router.query;
    useEffect(() => {
        placeService.getSearch(search)
        .then((place) => {
            console.log("here: "+place);
            setPlaces(place);
        })
        .catch(err => console.log(err))
    }, [search]);

  return (
    <main>
        <TitlePage title="Search" />
        <PlaceGrid places={places} />
    </main>
  )
}
export default Index;