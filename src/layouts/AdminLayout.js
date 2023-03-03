import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Logo from "../../public/logo.png";
import styles from "./index.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
const Index = ({ children }) => {
  const router = useRouter();
  const logout= () =>{
    localStorage.removeItem('token');
    router.replace("/").then(() => router.reload());
  }
  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__main}>
          <div className={styles.header__logo}>
            <Link href="/" className={styles.link}>
              <img src={Logo.src} alt="Airbnb" />
            </Link>
          </div>
          <div className={styles.header__page}>
              <h2><Link href="/admin/users" style={{ textDecoration: 'none', color: 'black'}}>Users</Link></h2>
              <h2><Link href="/admin/bookings" style={{ textDecoration: 'none', color: 'black'}}>Reservations</Link></h2>
          </div>
          <div className={styles.header__logout}>
            <h2 onClick={logout}>Logout</h2>
          </div>
          </div>
      </header>
      <div>
        {children}
      </div>
      <Footer />
    </>
  );
}

export default Index;