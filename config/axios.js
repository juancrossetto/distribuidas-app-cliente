import axios from "axios"; //npm i axios

const clientAxios = axios.create({
  baseURL: "https://distribuidapp.herokuapp.com/api/", //"http://192.168.0.22:4000/api/", //
});

export default clientAxios;
