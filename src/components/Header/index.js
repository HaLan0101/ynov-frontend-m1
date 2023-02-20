import {useContext,useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import WishlistContext from '../../context/WishlistContext';
import Link from "next/link";
import styles from "./index.module.scss";
import Logo from "../../../public/logo.png";
import Search from "../Search/index";
import Language from "../../../public/language.svg";
import Menu from "../../../public/menu.svg";
import Account from "../../../public/account.svg";
import Filter from "../../../public/filter.svg";
import Modal from "../../components/Modal/index";
import ModalAccount from "../../components/ModalAccount/index";
import Input from "../../components/Input/index";
import Button from "../../components/Button/index";
import typePlaceService from "../../services/typePlace.service";
import Notification from "../../components/Notification";
import AuthService from "../../services/auth.service";
const Index = () => {
  const [showModal,setShowModal]= useState(false);
  const [showModalLogin,setShowModalLogin]= useState(false);
  const [showModalRegister,setShowModalRegister]= useState(false);
  const [showModalAccount,setShowModalAccount]= useState(false);
  const router = useRouter();
  const [type, setType] = useState(null);
  const [message, setMessage] = useState(null);
  const [userForm, setUserForm] = useState({
    email: "",
    password: ""
  });
  const [userFormRegister, setUserFormRegister] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  })
  const { wishlist } = useContext(WishlistContext);
  const [search, setSearch] = useState("");
  const [typePlaces, setTypePlaces] = useState();
  const [filter, setFilter] = useState({
    prixMax:"",
    prixMin:"",
    capaciteMax:"",
    capaciteMin:"",
    type:""
  });
  const submitForm = (e) =>{
    if(filter.capaciteMax == "" && filter.capaciteMin == "" && filter.type == "")
    {
      router.push({ pathname: "/filter", query: { "price": `${filter.prixMin}-${filter.prixMax}`} });
    }
    else if(filter.prixMax == "" && filter.prixMin == "" && filter.type == "")
    {
      router.push({ pathname: "/filter", query: { "capacity": `${filter.capaciteMin}-${filter.capaciteMax}`} });
    }
    else if(filter.prixMax =="" && filter.prixMin == "" && filter.capaciteMax == "" && filter.capaciteMin == "")
    {
      router.push({ pathname: "/filter", query: { "types": `${filter.type}`} });
    }
    else if(filter.prixMax == "" && filter.prixMin == "")
    {
      router.push({ pathname: "/filter", query: { "capacity": `${filter.capaciteMin}-${filter.capaciteMax}`, "types": `${filter.type}`} });
    }
    else if(filter.capaciteMax == "" && filter.capaciteMin == "")
    {
      router.push({ pathname: "/filter", query: { "price": `${filter.prixMin}-${filter.prixMax}`, "types": `${filter.type}`} });
    }
    else if(filter.type == "")
    {
      router.push({ pathname: "/filter", query: { "price": `${filter.prixMin}-${filter.prixMax}`, "capacity": `${filter.capaciteMin}-${filter.capaciteMax}`} });
    }
    else if(filter.prixMax !="" && filter.prixMin != "" && filter.capaciteMax != "" && filter.capaciteMin != "" && filter.type != "")
    {
      router.push({ pathname: "/filter", query: { "price": `${filter.prixMin}-${filter.prixMax}`, "capacity": `${filter.capaciteMin}-${filter.capaciteMax}`, "types": `${filter.type}`} });
    }
  }

  const handleFilter = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value })
  }

  const handleInput = (e) => {
    setSearch(e.target.value);
  }
  const onClickSubmit = (e) => {
    router.push({ pathname: "/search", query: { "search": `${search}` } });
  }

  const activeModal = (e) =>{
    setShowModal(true);
  }

  const activeModalLogin = (e) =>{
    setShowModalAccount(!showModalAccount);
    setShowModalLogin(true);
  }

  const activeModalRegister = (e) =>{
    setShowModalAccount(!showModalAccount);
    setShowModalRegister(true);
  }
  const activeModalAccount = (e) =>{
    setShowModalAccount(true);
  }

  
  useEffect(() => {
    typePlaceService.getTypePlaces()
      .then((typePlace) => {
        console.log(typePlace);
        setTypePlaces(typePlace);
      })
      .catch(err => console.log(err))
  }, []);
  console.log(wishlist);

  const handleInputLogin = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  }

  const submitFormLogin = (e) => {
    e.preventDefault();
    AuthService.login(userForm)
      .then((data) => {
        if (!data.token) {
          setMessage(data.message);
          setType("error")
          return false;
        } 
        localStorage.setItem('token', data.token);
        setShowModalLogin(!showModalLogin);
        router.push("/profil");
      })
      .catch(
        (err) => {
          console.log(err);
          setMessage(err);
        }
      )
  }

  const handleInputRegister = (e) => {
    setUserFormRegister({ ...userFormRegister, [e.target.name]: e.target.value })
  }

  const submitFormRegister = (e) => {
    e.preventDefault(e);
    AuthService.register(userFormRegister)
    .then((user) => {
      localStorage.setItem('token',user.token);
      if(!user.token){
        setMessage("Vérifiez votre identifiant et mot de passe");
        setType("error")
        return false;
      }
      setShowModalRegister(!showModalRegister);
      router.push(`/profil`);
    })
    .catch(err => {
      console.log(err);
      setMessage(err);
    })
  }
  const logout= () =>{
    localStorage.removeItem('token');
    router.push("/");
  }
  return (
    <header className={styles.header}>
        {/* <ModalAccount title="Filtre" isActive={showModalAccount} closeFunction={()=>setShowModalAccount(!showModalAccount)}>
            <p className={styles.modalAccount}><Link href="/profil">Profil</Link></p>
            <p className={styles.modalAccount}>Mes favoris</p>
            <p className={styles.modalAccount} onClick={logout}>Déconnecter</p>
          </ModalAccount>  */}
          <ModalAccount title="Filtre" isActive={showModalAccount} closeFunction={()=>setShowModalAccount(!showModalAccount)}>
            <p className={styles.modalAccount} onClick={activeModalRegister}>Inscription</p>
            <p className={styles.modalAccount} onClick={activeModalLogin}>Connexion</p>
            <p className={styles.modalAccount}><Link href="/profil">Profil</Link></p>
            <p className={styles.modalAccount}><Link href="/wishlist">Mes favoris</Link></p>
            {/* <p className={styles.modalAccount} onClick={logout}>Déconnecter</p> */}
          </ModalAccount> 
      <Modal title="Connexion" isActive={showModalLogin} closeFunction={()=>setShowModalLogin(!showModalLogin)}>
          <div className="page__login">
          <form className={styles.form__login}>
            <Input
              titleLabel="email"
              inputType="email"
              inputPlaceholder="email"
              inputName="email"
              inputValue={userForm.email || ""}
              inputOnChange={(e) => {
                handleInputLogin(e);
              }}
            />
            <Input
              titleLabel="password"
              inputType="password"
              inputPlaceholder="password"
              inputName="password"
              inputValue={userForm.password || ""}
              inputOnChange={(e) => {
                handleInputLogin(e);
              }}
            />
            <Button
              title="submit"
              handleClick={(e) => {
                submitFormLogin(e);
              }}
              type="submit"
              btnClass="btn btn__primary"
            />
            {
              message && <Notification type={type} message={message}/>
            }
          </form>
        </div>
      </Modal>
      <Modal title="Inscription" isActive={showModalRegister} closeFunction={()=>setShowModalRegister(!showModalRegister)}>
          <div className='page__register'>
            <form className={styles.form__register}>
              <Input
                titleLabel="Firstname"
                inputType="text"
                inputPlaceholder="firstname"
                inputName="firstName"
                inputValue={userFormRegister.firstName || ""}
                inputOnChange={(e) => {
                  handleInputRegister(e);
                }}
              />
              <Input
                titleLabel="Lastname"
                inputType="text"
                inputPlaceholder="lastname"
                inputName="lastName"
                inputValue={userFormRegister.lastName || ""}
                inputOnChange={(e) => {
                  handleInputRegister(e);
                }}
              />
              <Input
                titleLabel="Email"
                inputType="email"
                inputPlaceholder="email"
                inputName="email"
                inputValue={userFormRegister.email || ""}
                inputOnChange={(e) => {
                  handleInputRegister(e);
                }}
              />
              <Input
                titleLabel="Password"
                inputType="password"
                inputPlaceholder="password"
                inputName="password"
                inputValue={userFormRegister.password || ""}
                inputOnChange={(e) => {
                  handleInputRegister(e);
                }}
              />
              <Button
                title="submit"
                handleClick={(e) => {
                  submitFormRegister(e)
                }}
                type="submit"
                btnClass="btn btn__primary"
              />
              {
                message && <Notification type={type} message={message}/>
              } 
            </form>
        </div>
      </Modal>
      <Modal title="Filtre" isActive={showModal} closeFunction={()=>setShowModal(!showModal)}>
        <form className={styles.form__filter}>
          <p>Prix</p>
          <div className={styles.form__input}>
              <Input
              titleLabel="Min"
              inputType="number"
              inputPlaceholder="Valeur minimum"
              inputName="prixMin"
              inputValue={filter.prixMin || ""}
              inputOnChange={(e) => {
                handleFilter(e);
              }}
              />
              <Input
              titleLabel="Max"
              inputType="number"
              inputPlaceholder="Valeur maximum"
              inputName="prixMax"
              inputValue={filter.prixMax || ""}
              inputOnChange={(e) => {
                handleFilter(e);
              }}
              />
          </div>
          <p>Capacité</p>
          <div className={styles.form__input}>
              <Input
              titleLabel="Min"
              inputType="number"
              inputPlaceholder="Valeur minimum"
              inputName="capaciteMin"
              inputValue={filter.capaciteMin || ""}
              inputOnChange={(e) => {
                handleFilter(e);
              }}
              />
              <Input
              titleLabel="Max"
              inputType="number"
              inputPlaceholder="Valeur maximum"
              inputName="capaciteMax"
              inputValue={filter.capaciteMax || ""}
              inputOnChange={(e) => {
                handleFilter(e);
              }}
              />
          </div>
          <p>Type</p>
          <div className={styles.form__input}>
            <select name="type" id="" value={filter.type || ""} onChange={(e) => handleFilter(e)}>
              <option value="">Type</option>
              {
                typePlaces && typePlaces.map((item) => (
                  <option value={item._id}>{item.name}</option>
                ))
              }
            </select>
          </div>
          <div className={styles.form__input}>
            <Button
              title="submit"
              handleClick={(e) => {
                submitForm(e)
              }}
              type="submit"
              btnClass="btn btn__primary"
            />
          </div>
        </form>
      </Modal>
      <div className={styles.header__main}>
        <div className={styles.header__logo}>
          <Link href="/">
            <img src={Logo.src} alt="Airbnb" />
          </Link>
        </div>
        <div className={styles.header__search}>
          <Search message="Titre....." 
            onChange={(e) => {
              handleInput(e);
            }}
           onClick={onClickSubmit}></Search>
        </div>
        <div className={styles.header__menu}>
          <ul className={styles.nav__list}>
            <li className={styles.nav__item}>
              <button>Mettre mon logement sur Airbnb</button>
            </li>
            <li className={styles.nav__item}>
              <button>
                <img src={Language.src} alt="language" />
              </button>
            </li>
            <li className={styles.nav__item} onClick={activeModalAccount}>
              <button>
                <ul>
                  <li>
                    <img src={Menu.src} alt="menu" />
                  </li>
                  <li>
                    <img src={Account.src} alt="account" />
                  </li>
                </ul>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.header__filter}>
        <ul className={styles.nav__list}>
          <li className={styles.nav__item}>
            <img src="https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg" alt="icon" />
            <p>Tendance</p>
          </li>
          <li className={styles.nav__item}>
            <img src="https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg" alt="icon" />
            <p>Calbanes</p>
          </li>
          <li className={styles.nav__item}>
            <img src="https://a0.muscache.com/pictures/4d4a4eba-c7e4-43eb-9ce2-95e1d200d10e.jpg" alt="icon" />
            <p>Cabanes perchées</p>
          </li>
          <li className={styles.nav__item}>
            <img src="https://a0.muscache.com/pictures/677a041d-7264-4c45-bb72-52bff21eb6e8.jpg" alt="icon" />
            <p>Bord de lac</p>
          </li>
          <li className={styles.nav__item}>
            <img src="https://a0.muscache.com/pictures/6ad4bd95-f086-437d-97e3-14d12155ddfe.jpg" alt="icon" />
            <p>Campagne</p>
          </li>
          <li className={styles.nav__item}>
            <img src="https://a0.muscache.com/pictures/757deeaa-c78f-488f-992b-d3b1ecc06fc9.jpg" alt="icon" />
            <p>Au pied des pistes</p>
          </li>
          <li className={styles.nav__item}>
            <img src="https://a0.muscache.com/pictures/c8e2ed05-c666-47b6-99fc-4cb6edcde6b4.jpg" alt="icon" />
            <p>Luxe</p>
          </li>
          <li className={styles.nav__item}>
            <img src="https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg" alt="icon" />
            <p>Piscines</p>
          </li>
          <li className={styles.nav__item}>
            <img src="https://a0.muscache.com/pictures/89faf9ae-bbbc-4bc4-aecd-cc15bf36cbca.jpg" alt="icon" />
            <p>Dômes</p>
          </li>
          <li className={styles.nav__item}>
            <img src="https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg" alt="icon" />
            <p>Avec vue</p>
          </li>
          <li className={styles.nav__item}>
            <img src="https://a0.muscache.com/pictures/78ba8486-6ba6-4a43-a56d-f556189193da.jpg" alt="icon" />
            <p>Grandes demeures</p>
          </li>
          <li className={styles.nav__item}>
            <img src="https://a0.muscache.com/pictures/aaa02c2d-9f0d-4c41-878a-68c12ec6c6bd.jpg" alt="icon" />
            <p>Fermes</p>
          </li>
          <li className={styles.nav__item}>
            <img src="https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg" alt="icon" />
            <p>Wow !</p>
          </li>
          <li className={styles.nav__item}>
            <img src="https://a0.muscache.com/pictures/35919456-df89-4024-ad50-5fcb7a472df9.jpg" alt="icon" />
            <p>Tiny houses</p>
          </li>
          <li className={styles.nav__item}>
            <div className={styles.nav__filter} onClick={activeModal}>
              <img src={Filter.src} alt="filter" />
              <p>Filtres</p>
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Index;