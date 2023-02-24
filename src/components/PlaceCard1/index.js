import { useContext,useState, useEffect } from "react";
import { useRouter } from 'next/router';
import styles from "./index.module.scss";
import Modal from "../Modal";
import Button from "../Button";
import TitlePage from "../TitlePage";
import Input from "../Input";
import placeService from "../../services/place.service";
import typePlaceService from "../../services/typePlace.service";
const Index = ({ place }) => {
  const router = useRouter();
  const [showModal,setShowModal]= useState(false);
  const [typePlaces, setTypePlaces] = useState();
  const [place1, setPlace1] = useState();
  const [placeForm, setPlaceForm] = useState({
    title: "",
    description: "",
    price: "",
    capacity: "",
    types: "",
    owner: "",
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
  const handleClick = () => {
    router.push("/place/"+place._id);
  };
  
  const showPopUp = () => {
    setShowModal(true);
  }

  const submitUpdate = (e) => {
    e.preventDefault(e);
    const token = localStorage.getItem('token');
    placeService.updatePlace(token, placeForm, place._id)
    .then(place => {
      setShowModal(false);
      router.replace("/myPlaces").then(() => router.reload());
    })
    .catch(err => console.log(err))
  }

  const deletePlace = (e) => {
    e.preventDefault(e);
    const token = localStorage.getItem('token');
    placeService.deletePlace(token, place._id)
    .then(place => {
      router.replace("/myPlaces").then(() => router.reload());
    })
    .catch(err => console.log(err))
  }
  useEffect(() => {
    typePlaceService.getTypePlaces()
      .then((typePlace) => {
        setTypePlaces(typePlace);
      })
      .catch(err => console.log(err))
  }, []);
  useEffect(() => {
    const token = localStorage.getItem('token');
    placeService.getMyPlace(token, place._id)
      .then((place) => {
        setPlaceForm(place);
        setPlace1(place);
      })
      .catch(err => console.log(err))
  }, []);
  return (
    <div className={styles.wrapper}>
      <Modal isActive={showModal} closeFunction={()=>setShowModal(!showModal)}>
          <TitlePage title="Modifier"/>
          <form className={styles.form__place} onSubmit={(e) => submitUpdate(e)}>
            <Input
              titleLabel="Title"
              inputType="text"
              inputPlaceholder="title"
              inputName="title"
              inputValue={placeForm.title}
              inputOnChange={(e) => setPlaceForm({...placeForm, title:e.target.value})}
            />
            <Input
              titleLabel=""
              inputType="hidden"
              inputPlaceholder="owner"
              inputName="owner"
              inputValue={placeForm.owner}
              inputOnChange={(e) => setPlaceForm({...placeForm, owner:e.target.value})}
            />
            <Input
              titleLabel="Price"
              inputType="number"
              inputPlaceholder="price"
              inputName="price"
              inputValue={placeForm.price}
              inputOnChange={(e) => setPlaceForm({...placeForm, price:e.target.value})}
            />
            <Input
              titleLabel="Description"
              inputType="text"
              inputPlaceholder="description"
              inputName="description"
              inputValue={placeForm.description}
              inputOnChange={(e) => setPlaceForm({...placeForm, description:e.target.value})}
            />
            <Input
              titleLabel="Capacity"
              inputType="number"
              inputPlaceholder="capacity"
              inputName="capacity"
              inputValue={placeForm.capacity}
              inputOnChange={(e) => setPlaceForm({...placeForm, capacity:e.target.value})}
            />
            <Input
              titleLabel="Images"
              inputType="text"
              inputPlaceholder="images"
              inputName="images"
              inputValue={placeForm.images}
              inputOnChange={(e) => setPlaceForm({...placeForm, images:e.target.value})}
            />
            <Input
              titleLabel="City"
              inputType="text"
              inputPlaceholder="city"
              inputName="city"
              inputValue={placeForm.address.city}
              inputOnChange={(e) => {
                setPlaceForm({ ...placeForm, address:{...placeForm.address, city: e.target.value }});
              }}
            />
            <Input
              titleLabel="Street"
              inputType="text"
              inputPlaceholder="street"
              inputName="street"
              inputValue={placeForm.address.street}
              inputOnChange={(e) => {
                setPlaceForm({ ...placeForm, address:{...placeForm.address, street: e.target.value }});
              }}
            />
            <Input
              titleLabel="Zip Code"
              inputType="number"
              inputPlaceholder="zipCode"
              inputName="zipCode"
              inputValue={placeForm.address.zipCode}
              inputOnChange={(e) => {
                setPlaceForm({ ...placeForm, address:{...placeForm.address, zipCode: e.target.value }});
              }}
            />
            <Input
              titleLabel="Latitude"
              inputType="number"
              inputPlaceholder="lat"
              inputName="lat"
              inputValue={placeForm.address.gps.lat}
              inputOnChange={(e) => {
                setPlaceForm({ ...placeForm, address:{...placeForm.address.gps, lat: e.target.value }});
              }}
            />
            <Input
              titleLabel="Longtitude"
              inputType="number"
              inputPlaceholder="long"
              inputName="long"
              inputValue={placeForm.address.gps.long}
              inputOnChange={(e) => {
                setPlaceForm({ ...placeForm, address:{...placeForm.address.gps, long: e.target.value }});
              }}
            />
            <select name="types" id="" value={placeForm.types} onChange={(e) => setPlaceForm({...placeForm, types:e.target.value})}>
              <option value="">Type</option>
              {
                typePlaces && typePlaces.map((item) => (
                  <option value={item._id}>{item.name}</option>
                ))
              }
            </select>
            <Button
              title="Modifier"
              type="submit"
              btnClass="btn__pink"
            />
          </form>
        </Modal>
      <div className={styles.thumbnail__wrapper}>
        <div className={styles.overlay} onClick={handleClick}></div>
        {
        place.images && place.images.map((item) => (
        <img src={item} key={item}/>
        ))
        }
        {/* <img src={place.images} alt={place.title} /> */}
      </div>
      <div className={styles.content}>
        <div className={styles.metadata}>
            <p><b>{place.address.street}, {place.address.city} </b></p>
            <p>{place.title}</p>
            <p><b>{place.price}</b> € par nuit</p>
        </div>
        <Button
              title="Modifier"
              handleClick={(e) => showPopUp(e)}
              type="button"
              btnClass="btn__pink"
          />
        <Button
            title="Supprimer"
            handleClick={(e) => deletePlace(e)}
            type="button"
            btnClass="btn__black"
        />
      </div>
    </div>
  );
}

export default Index;