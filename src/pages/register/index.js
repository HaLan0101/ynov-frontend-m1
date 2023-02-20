import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Button from '../../components/Button';
import Input from '../../components/Input';
import TitlePage from '../../components/TitlePage';
import styles from "./index.module.scss";
import authService from '../../services/auth.service';
import Notification from "../../components/Notification";
const Index = () => {
  const router = useRouter();
  const [message, setMessage] = useState(null);
  const [type, setType] = useState(null);
  const [userForm, setUserForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  })

  const handleInput = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value })
    //userForm pour dire garder les éléments précédents dans useState
  }

  const submitForm = (e) => {
    e.preventDefault(e);
    authService.register(userForm)
    .then((user) => {
      if(!user.token){
          setMessage("Vérifiez votre identifiant et mot de passe");
          setType("error")
          return false;
      }
      localStorage.setItem('token',user.token);
      router.push("/profil");
    })
    .catch(err => {
      console.log(err);
      setMessage(err);
    })
  }

  return (
    <div className={styles.page__register}>
      <TitlePage title="Create your account" />
      <form className={styles.form__register}>
        <Input
          titleLabel="Firstname"
          inputType="text"
          inputPlaceholder="firstname"
          inputName="firstName"
          inputValue={userForm.firstName || ""}
          inputOnChange={(e) => {
            handleInput(e);
          }}
        />
        <Input
          titleLabel="Lastname"
          inputType="text"
          inputPlaceholder="lastname"
          inputName="lastName"
          inputValue={userForm.lastName || ""}
          inputOnChange={(e) => {
            handleInput(e);
          }}
        />
        <Input
          titleLabel="Email"
          inputType="email"
          inputPlaceholder="email"
          inputName="email"
          inputValue={userForm.email || ""}
          inputOnChange={(e) => {
            handleInput(e);
          }}
        />
        <Input
          titleLabel="Password"
          inputType="password"
          inputPlaceholder="password"
          inputName="password"
          inputValue={userForm.password || ""}
          inputOnChange={(e) => {
            handleInput(e);
          }}
        />
        <Button
          title="submit"
          handleClick={(e) => {
            submitForm(e)
          }}
          type="submit"
          btnClass="btn btn__primary"
        />
        {
          message && <Notification type={type} message={message}/>
        } 
      </form>
    </div>
  );
}

export default Index;