import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://test-project-43334.firebaseio.com/'
});

export default instance;