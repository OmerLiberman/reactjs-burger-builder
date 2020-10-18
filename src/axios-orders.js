import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger1-49bba.firebaseio.com/'
});

export default instance;