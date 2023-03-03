import {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import TitlePage from "../../components/TitlePage";
import styles from "./index.module.scss";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import userService from '../../services/user.service';
import WithAuth from '../../HOC/WithAuth';
const Index = () => {
  const router = useRouter();
  const [userForm, setUserForm] = useState();
  const [showModal,setShowModal]= useState(false);
  const [user, setUser] = useState();
  const [beOwner, setBeOwner] = useState({
    type: "OWNER"
  }, [user]);
  const handleInput = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value })
    //userForm pour dire garder les éléments précédents dans useState
  }
  const submitUpdate = (e) => {
    e.preventDefault(e);
    const token = localStorage.getItem('token');
    userService.updateUser(token, userForm)
    .then(user => {
      setShowModal(false);
      setUser(user);
    })
    .catch(err => console.log(err))
  }

  const submitOwner = (e) => {
    e.preventDefault(e);
    const token = localStorage.getItem('token');
    userService.updateUser(token, beOwner)
    .then(user => {
      setUser(user);
      router.replace("/profil").then(() => router.reload());
    })
    .catch(err => console.log(err))
  }
  const showPopUp = () => {
    setShowModal(true);
  }
  useEffect(() => {
    const token = localStorage.getItem('token');
    userService.getMe(token)
      .then((user) => {
        setUserForm(user);
        setUser(user);
      })
      .catch(err => console.log(err))
  }, []);
  const logout=() =>{
    localStorage.removeItem('token');
    router.replace("/").then(() => router.reload());
  }
  return (
    <>
    {
      user && (
        <>
          <div className={styles.wrapper}>
          <TitlePage title="Mon profil"/>
            <Modal isActive={showModal} closeFunction={()=>setShowModal(!showModal)}>
              <TitlePage title="Modifier"/>
              <form className="form__profil" onSubmit={(e) => submitUpdate(e)}>
                <Input
                  titleLabel="Firstname"
                  inputType="text"
                  inputPlaceholder="firstname"
                  inputName="firstName"
                  inputValue={userForm.firstName}
                  inputOnChange={(e) => {
                    handleInput(e);
                  }}
                />
                <Input
                  titleLabel="Lastname"
                  inputType="text"
                  inputPlaceholder="lastname"
                  inputName="lastName"
                  inputValue={userForm.lastName}
                  inputOnChange={(e) => {
                    handleInput(e);
                  }}
                />
                <Input
                  titleLabel="Email"
                  inputType="email"
                  inputPlaceholder="email"
                  inputName="email"
                  inputValue={userForm.email}
                  inputOnChange={(e) => {
                    handleInput(e);
                  }}
                />
                <Button
                  title="Modifier"
                  type="submit"
                  btnClass="btn__black"
                />
              </form>
            </Modal>
                <p>FirstName : {user.firstName}</p>
                <p>lastName : {user.lastName}</p>
                <p>Email : {user.email}</p>
            <Button
              title="Modifier"
              handleClick={(e) => showPopUp(e)}
              type="button"
              btnClass="btn__pink"
            />
            <Button title="Se déconnecter" type="button" btnClass="btn__black" handleClick={() => logout()}></Button>
            <Button title="Etre proprietaire" type="button" btnClass="btn__white" handleClick={(e) => submitOwner(e)}></Button>
          </div>
        </>
      )
    }
    </>
  );
}

export default WithAuth(Index);