import axois from "axios";
import axios from "axios";

export default class Request {
  static postPlayerData(id, name, color) {
    const localUrl = "http://localhost:8083";
    const herokuUrl = "https://app-mobile-api.herokuapp.com";
    const baseUrl = herokuUrl;
    return axios.post(baseUrl + "/player", {
      id: id,
      name: name,
      color: color
    });
  }
}
