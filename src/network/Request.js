import axois from "axios";
import axios from "axios";

export default class Request {
  static postPlayerData(id, name, color) {
    axios
      .post("http://localhost:8083/player", {
        id: "2cef6114-68b9",
        name: "Clau",
        color: "color"
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }
}
