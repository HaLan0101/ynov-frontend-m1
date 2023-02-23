export default {
    getPlaces() {
        return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/place`, {
          method: "GET"
        }).then(res => res.json())
    },
    getSearch(search) {
      return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/place/search/${search}`, {
        method: "GET"
      }).then(res => res.json())
    },
    getFilter(filter) {
      return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/place/filter/places?${filter}`, {
        method: "GET"
      }).then(res => res.json())
    },
    getPlace(id){
      return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/place/${id}`, {
        method: "GET"
      }).then(res => res.json())
    },
    getMyPlaces(token){
      return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/place/myPlaces/get/`, {
        method: "GET",
        headers: {
          "authorization":token
        }
      }).then(res => res.json())
    }
}