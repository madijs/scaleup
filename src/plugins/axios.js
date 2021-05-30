import axios from 'axios'

axios.defaults.baseURL = 'http://platformapi.scaleup.plus/api';

axios.defaults.headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

export default axios

