import axios from "axios";

export default axios.create({
    baseURL: 'https://nodejs-test-api-blog.herokuapp.com/api/v1/'
});