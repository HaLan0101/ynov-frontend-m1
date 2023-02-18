export default {
    getTypePlaces() {
        return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/type-place`, {
          method: "GET"
        }).then(res => res.json())
    }
}