import '../styles/styles.scss';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import {WishlistContextProvider} from '../context/WishlistContext';
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
    {
      router && router.asPath.startsWith('/admin') ? (
        <AdminLayout>
          <Component {...pageProps} />
        </AdminLayout>
        ) : (
        <WishlistContextProvider>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>          
        </WishlistContextProvider>
      )
        }
    </>
  )
}

export default MyApp