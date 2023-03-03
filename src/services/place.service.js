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
    },
    getMyPlace(token, id){
      return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/place/myPlace/${id}`, {
        method: "GET",
        headers: {
          "authorization":token
        }
      }).then(res => res.json())
    },
    createPlace(token, place) {
      return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/place`, {
        method: "POST",
        headers: {
          "Authorization": token,
          "Content-type":"Application/json"
        },
        body: JSON.stringify(place)
      }).then(res => res.json())
    },
    updatePlace(token, place, id) {
      return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/place/${id}`, {
        method: "PUT",
        headers: {
          "Authorization": token,
          "Content-type":"Application/json"
        },
        body: JSON.stringify(place)
      }).then(res => res.json())
    },
    deletePlace(token, id) {
      return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/place/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": token,
          "Content-type":"Application/json"
        }
      }).then(res => res.json())
    }
}