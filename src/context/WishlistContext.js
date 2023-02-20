import {createContext, useState, useEffect} from 'react';

const WishlistContext = createContext();

export default WishlistContext;

export const WishlistContextProvider = ({ children }) => {

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);
  
  const removePlaceWishlist = (place) => {
    if(wishlist.indexOf(place) != -1){
      wishlist.splice(wishlist.indexOf(place),1);
      setWishlist([...wishlist])
    }
    
  }
  const addPlaceWishlist = (place) => {
    if(wishlist.findIndex((item) => item._id === place._id) == -1){
      setWishlist([...wishlist, place])
    }
  }

  const deleteWishlist = () => {
    setWishlist([])
  }

  const context = {
    removePlaceWishlist,
    addPlaceWishlist,
    deleteWishlist,
    wishlist
  }

  return (
  <WishlistContext.Provider value={context}>
    {children}
  </WishlistContext.Provider>
  )

}