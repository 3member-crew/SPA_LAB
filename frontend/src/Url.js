import axios from "axios"

const client = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
        'Authorization': 'Token ' + localStorage.getItem('token'),
     },
})
export default client