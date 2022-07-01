import axios from 'axios'
import { REACT_APP_API_URL } from '../constants/httpContants.js'

const getToken = () => {
    const token = localStorage.getItem('token') || '"no-token"'
    return token.substring(1, token.length - 1)
}

const callApiHttp = ({ url, method, baseUrl, data, params }) => 
    axios.create({
        baseURL: baseUrl || REACT_APP_API_URL,
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        },
    })({
        method,
        url,
        data,
        params,
    })

export default callApiHttp