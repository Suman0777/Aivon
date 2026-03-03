import axios from 'axios';

const Api = axios.create({
    baseURL: process.env.LOCAL_HOST ,
    headers: {
        'Content-Type': 'application/json',
    },
})

export default Api