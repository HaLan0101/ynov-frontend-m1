import {createContext, useState, useEffect} from 'react';

const WishlistContext = createContext();

export default WishlistContext;

export const WishlistContextProvider = ({ children }) => {

    // useEffect(() =>{
    //     setWishlist(localStorage.getItem('wishlist'));
    //     wishlistService.getUserWishlist.then((wishlist) =>{
    //         setWishlist(wishlist);
    //     })
    // })

  
  const [wishlist, setWishlist] = useState([]);

  const removePlaceWishlist = (place) => {
    if(wishlist.indexOf(place) != -1){
      wishlist.splice(wishlist.indexOf(place),1);
      setWishlist([...wishlist])
    }
    
  }
  const addPlaceWishlist = (place) => {
    if(wishlist.indexOf(place) == -1){
        setWishlist([...wishlist, place])
    }
    // ...
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