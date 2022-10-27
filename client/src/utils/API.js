import axios from 'axios';

export default {
    getBrickSet: (query) => {
        return axios.get(`/api/brickset/`+query)
    }
}