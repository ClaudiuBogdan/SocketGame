import axois from "axios";
import axios from "axios";

export default class Request {
  static postPlayerData(id, name, color) {
    return axios.post("https://app-mobile-api.herokuapp.com/player", {
      id: id,
      name: name,
      color: color
    });
  }
}
