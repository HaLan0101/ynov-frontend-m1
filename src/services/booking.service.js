export default {
    getBookings(token) {
        return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/booking`, {
          method: "GET",
          headers: {
            "authorization":token
          }
        }).then(res => res.json())
    },
    getMyBookings(token) {
      return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/booking/myBookings/get/`, {
        method: "GET",
        headers: {
            "authorization":token
        }
      }).then(res => res.json())
    },
    getMyBookingsOwner(token) {
      return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/booking/myBookingsOwner/get/`, {
        method: "GET",
        headers: {
            "authorization":token
        }
      }).then(res => res.json())
    },
    createBooking(token, booking) {
      return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/booking`, {
        method: "POST",
        headers: {
          "Authorization": token,
          "Content-type":"Application/json"
        },
        body: JSON.stringify(booking)
      }).then(res => res.json())
    },
    updateBooking(token, booking, id) {
      return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/booking/${id}`, {
        method: "PUT",
        headers: {
          "Authorization": token,
          "Content-type":"Application/json"
        },
        body: JSON.stringify(booking)
      }).then(res => res.json())
    }
}