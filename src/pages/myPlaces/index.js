import {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import TitlePage from "../../components/TitlePage";
import placeService from "../../services/place.service";
import styles from "./index.module.scss";
import PlaceCard1 from "../../components/PlaceCard1";
import Button from '../../components/Button';
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import typePlaceService from "../../services/typePlace.service";
import WithOwner from '../../HOC/WithOwner';
const Index = () => {
    const router = useRouter();
    const [places, setPlaces] = useState();
    const [typePlaces, setTypePlaces] = useState();
    const [placeForm, setPlaceForm] = useState({
      title: "",
      description: "",
      price: "",
      rating: 0,
      capacity: "",
      types: "",
      images: "",
      address:{
          city: "",
          street: "",
          zipCode: "",
          gps: {
            lat: "",
            long: "",
          }
      }
    });
    const [showModal,setShowModal]= useState(false);
    const showPopUp = () => {
      setShowModal(true);
    }
    const submitForm = (e) => {
      e.preventDefault(e);
      const token = localStorage.getItem('token');
      placeService.createPlace(token, placeForm)
      .then(place => {
        setShowModal(false);
        router.replace("/myPlaces").then(() => router.reload());
      })
      .catch(err => {
        console.log(err);
        setMessage(err);
      })
    }
    useEffect(() => {
      const token = localStorage.getItem('token');
      placeService.getMyPlaces(token)
      .then((place) => {
          setPlaces(place);
      })
      .catch(err => console.log(err))
    }, []);
    useEffect(() => {
      typePlaceService.getTypePlaces()
        .then((typePlace) => {
          setTypePlaces(typePlace);
        })
        .catch(err => console.log(err))
    }, []);
  return (
    <>
          <div className={styles.myPlaces}>
                <Modal isActive={showModal} closeFunction={()=>setShowModal(!showModal)}>
                  <TitlePage title="Créer une annonce"/>
                  <form className={styles.form__place}>
                    <Input
                      titleLabel="Title"
                      inputType="text"
                      inputPlaceholder="title"
                      inputName="title"
                      inputValue={placeForm.title || ""}
                      inputOnChange={(e) => setPlaceForm({...placeForm, title:e.target.value})}
                    />
                    <Input
                      titleLabel="Price"
                      inputType="number"
                      inputPlaceholder="price"
                      inputName="price"
                      inputValue={placeForm.price || ""}
                      inputOnChange={(e) => setPlaceForm({...placeForm, price:e.target.value})}
                    />
                    <Input
                      titleLabel="Description"
                      inputType="text"
                      inputPlaceholder="description"
                      inputName="description"
                      inputValue={placeForm.description || ""}
                      inputOnChange={(e) => setPlaceForm({...placeForm, description:e.target.value})}
                    />
                    <Input
                      titleLabel="Capacity"
                      inputType="number"
                      inputPlaceholder="capacity"
                      inputName="capacity"
                      inputValue={placeForm.capacity || ""}
                      inputOnChange={(e) => setPlaceForm({...placeForm, capacity:e.target.value})}
                    />
                    <Input
                      titleLabel="Images"
                      inputType="text"
                      inputPlaceholder="images"
                      inputName="images"
                      inputValue={placeForm.images || ""}
                      inputOnChange={(e) => setPlaceForm({...placeForm, images:e.target.value})}
                    />
                    <Input
                      titleLabel="City"
                      inputType="text"
                      inputPlaceholder="city"
                      inputName="city"
                      inputValue={placeForm.address.city || ""}
                      inputOnChange={(e) => {
                        setPlaceForm({ ...placeForm, address:{...placeForm.address, city: e.target.value }});
                      }}
                    />
                    <Input
                      titleLabel="Street"
                      inputType="text"
                      inputPlaceholder="street"
                      inputName="street"
                      inputValue={placeForm.address.street || ""}
                      inputOnChange={(e) => {
                        setPlaceForm({ ...placeForm, address:{...placeForm.address, street: e.target.value }});
                      }}
                    />
                    <Input
                      titleLabel="Zip Code"
                      inputType="number"
                      inputPlaceholder="zipCode"
                      inputName="zipCode"
                      inputValue={placeForm.address.zipCode || ""}
                      inputOnChange={(e) => {
                        setPlaceForm({ ...placeForm, address:{...placeForm.address, zipCode: e.target.value }});
                      }}
                    />
                    <Input
                      titleLabel="Latitude"
                      inputType="number"
                      inputPlaceholder="lat"
                      inputName="lat"
                      inputOnChange={(e) => {
                        setPlaceForm({ ...placeForm, address:{...placeForm.address, gps: {...placeForm.address.gps, lat : e.target.value} }});
                      }}
                    />
                    <Input
                      titleLabel="Longtitude"
                      inputType="number"
                      inputPlaceholder="long"
                      inputName="long"
                      inputOnChange={(e) => {
                        setPlaceForm({ ...placeForm, address:{...placeForm.address, gps: {...placeForm.address.gps, long : e.target.value} }});
                      }}
                    />
                    <select name="types" id="" value={placeForm.types || ""} onChange={(e) => setPlaceForm({...placeForm, types:e.target.value})}>
                      <option value="">Type</option>
                      {
                        typePlaces && typePlaces.map((item) => (
                          <option value={item._id}>{item.name}</option>
                        ))
                      }
                    </select>
                    <Button
                      title="Créer"
                      type="submit"
                      btnClass="btn__pink"
                      handleClick={(e) => {
                        submitForm(e)
                      }}
                    />
                  </form>
              </Modal>
              <TitlePage title="Mes announces" />
              <Button
                  title="Créer une annonce"
                  handleClick={(e) => showPopUp(e)}
                  type="button"
                  btnClass="btn__pink"
              />
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
export default WithOwner(Index);