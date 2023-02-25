export default {
    getMe(token) {
        return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/user`, {
          method: "GET",
          headers: {
            "authorization":token
          }
        }).then(res => res.json())
    },
    updateUser(token, user) {
      return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/user`, {
        method: "PUT",
        headers: {
          "Authorization": token,
          "Content-type":"Application/json"
        },
        body: JSON.stringify(user)
      }).then(res => res.json())
    },
    getUsers(token) {
      return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/user/users`, {
        method: "GET",
        headers: {
          "authorization":token
        }
      }).then(res => res.json())
  },
}