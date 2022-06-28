import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:9898",
});

// api.defaults.headers.common = {
//     'X-Requested-With': 'XMLHttpRequest'
// };

export default axios;