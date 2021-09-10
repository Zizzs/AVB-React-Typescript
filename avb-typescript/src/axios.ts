import axios from 'axios';

export default axios.create({
  baseURL: "https://avb-contacts-api.herokuapp.com/",
  headers: {
    "Content-type": "application/json"
  }
})