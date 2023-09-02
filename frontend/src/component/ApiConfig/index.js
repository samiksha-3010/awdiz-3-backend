import axios from 'axios';


const token = JSON.parse(localStorage.getItem("token"))

console.log(token,"token")
if (token) {
    var api = axios.create({
        baseURL: 'http://localhost:8000/api/v1',
        headers: { 'Authorization': `Bearer ${token}` }
    })
} else {
    var api = axios.create({
        baseURL: 'http://localhost:8000/api/v1'
    })
}

export default api