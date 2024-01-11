import axios from "axios"

const client = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
        'Authorization': localStorage.getItem('token')? 'Token ' + localStorage.getItem('token') : null,
     },
})
export default client;