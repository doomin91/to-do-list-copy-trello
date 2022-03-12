import axios from 'axios';

const instance = axios.create({
      baseURL: 'http://3.39.30.117:5000'
});

export default instance;