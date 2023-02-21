import {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import TitlePage from "../../../components/TitlePage";
import PlaceGrid from "../../../components/PlaceGrid";
import placeService from "../../../services/place.service";
const Index = () => {
    const router = useRouter();
    const [places, setPlaces] = useState();

    useEffect(()=>{
          const filter = router.query;
          var query = "";
          if(filter) {
              Object.entries(filter).forEach(entry =>{
                const [key, value] = entry;
                query += key +"="+ value + "&" ;
              })
              console.log("result: "+query)
              placeService.getFilter(query).then((places)=>{
                  setPlaces(places);
              })
          }
      
  },[router.query])

  return (
    <main>
        <TitlePage title="Filter" />
        <PlaceGrid places={places} />
    </main>
  )
}
export default Index;