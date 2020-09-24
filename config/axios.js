import axios from "axios"; //npm i axios

const clientAxios = axios.create({
  baseURL: "http://192.168.0.22:4000/api/", // "https://distribuidapp.herokuapp.com/api/", //
});

export default clientAxios;
