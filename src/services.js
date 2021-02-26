import axios from 'axios';

const axiosInstance = axios.create({
  //baseURL: "http://cors-anywhere.herokuapp.com/http://challenge-front-end-keyrus.us-east-2.elasticbeanstalk.com",
  baseURL: "",
  headers: {
    "Access-Control-Allow-Origin": "",
  }
});

export const api = {
  get(endpoint) {
    return axiosInstance.get(endpoint);
  }
}
