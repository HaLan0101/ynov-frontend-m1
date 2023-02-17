// import React, { useState } from 'react';
// import { useRouter } from 'next/router';
// import Button from '../../components/Button';
// import Input from '../../components/Input';
// import TitlePage from '../../components/TitlePage';
// const [placeForm, setPlaceForm] = useState({
//     title: "",
//     types: "",
//     pricing: {
//         perDay:""
//     },
//     images: [""],
//     capacity:"",
//     descriptions:"",
//     address:{
//         city:"",
//         street:"",
//         zipCode:"",
//         gps:{
//             lat:"",
//             long:""
//         },
//     }
//   })

// const handleInput = (e) => {
// setPlaceForm({ ...placeForm, [e.target.title]: e.target.value })
// //userForm pour dire garder les éléments précédents dans useState
// }
// const CreatePlace = () => {
//     return (
//         <div className='page__createPlace'>
//       <TitlePage title="Create your place" />
//       <form className={styles.form__createPlace}>
//         <Input
//           titleLabel="Title"
//           inputType="text"
//           inputPlaceholder="title"
//           inputName="title"
//           inputValue={placeForm.title || ""}
//           inputOnChange={(e) => {
//             handleInput(e);
//           }}
//         />
//         <Input
//           titleLabel="Type"
//           inputType="text"
//           inputPlaceholder="lastname"
//           inputName="lastName"
//           inputValue={userForm.lastName || ""}
//           inputOnChange={(e) => {
//             handleInput(e);
//           }}
//         />
//         <Input
//           titleLabel="Email"
//           inputType="email"
//           inputPlaceholder="email"
//           inputName="email"
//           inputValue={userForm.email || ""}
//           inputOnChange={(e) => {
//             handleInput(e);
//           }}
//         />
//         <Input
//           titleLabel="Password"
//           inputType="password"
//           inputPlaceholder="password"
//           inputName="password"
//           inputValue={userForm.password || ""}
//           inputOnChange={(e) => {
//             handleInput(e);
//           }}
//         />
//         <Button
//           title="submit"
//           handleClick={(e) => {
//             submitForm(e)
//           }}
//           type="submit"
//           btnClass="btn btn__primary"
//         />
//       </form>
//     </div>
//     );
// }

// export default CreatePlace;
