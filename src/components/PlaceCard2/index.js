import { useContext,useState, useEffect } from "react";
import styles from "./index.module.scss";
const Index = ({ user }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.metadata}>
            <p>First Name :  {user.firstName}</p>
            <p>Last Name : {user.lastName}</p>
            <p>Email : <b>{user.email}</b></p>
        </div>
      </div>
    </div>
  );
}

export default Index;