import {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import userService from '../../../services/user.service';
import styles from "./index.module.scss";
import PlaceCard2 from "../../../components/PlaceCard2";
import WithAdmin from '../../../HOC/WithAdmin';
import TitlePage from "../../../components/TitlePage";
const Index = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    const token = localStorage.getItem('token');
    userService.getUsers(token)
      .then((users) => {
          setUsers(users);
      })
      .catch(err => console.log(err))
  }, []);
  return (
    <>
        <div className={styles.myUsers}>
          <TitlePage title="Liste des utilisateurs"/>
          <div className={styles.grid}>
            {
              users && users.map((item) => (
                <PlaceCard2 key={item._id} user={item} />
              ))
            }
          </div>
        </div>
    </>
  );
}

export default WithAdmin(Index);