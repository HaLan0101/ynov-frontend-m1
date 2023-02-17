import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Button from '../../components/Button';
import Input from '../../components/Input';
import TitlePage from '../../components/TitlePage';
import styles from "./index.module.scss";
import authService from '../../services/auth.service';
const Index = () => {
  const router = useRouter();
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
    .then(user => {
      console.log(user);
      localStorage.setItem('token',JSON.stringify(user.token));
      if(!user.token){
        console.log(err);
      }
      router.push(`/login`);
    })
    .catch(err => console.log(err))
  }

  return (
    <div className='page__register'>
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
      </form>
      <p>
        {userForm.firstName} {userForm.lastName}
      </p>
    </div>
  );
}

export default Index;