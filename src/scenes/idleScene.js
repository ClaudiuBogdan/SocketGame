"use strict";
import "phaser";
import ColorUtil from "../util/ColorUtil";
import Request from "../network/Request";

export default class IdleScene extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.image("playerDot", require("assets/images/playerCircle.png"));
  }

  create() {
    this.player = { id: null, name: "none", color: "#eeeeee" };
    this.createSocketConnection();
    const nameLabelText = this.add.text(
      this.game.config.width / 2,
      this.game.config.height / 3,
      " Choose name:"
    );
    nameLabelText.setOrigin(0.5, 0);
    const playerSprite = this.add.sprite(
      this.game.config.width / 2,
      this.game.config.height / 2,
      "playerDot"
    );
    let color = ColorUtil.getRandomColor();
    playerSprite.setTint("0x" + color);
    const chooseColorText = this.add.text(
      this.game.config.width / 2,
      this.game.config.height / 1.7,
      "Click me"
    );
    chooseColorText.setOrigin(0.5, 0);
    chooseColorText.setInteractive();
    chooseColorText.on("pointerdown", () => {
      let playerName = document.getElementById("nameInput").value;
      Request.postPlayerData(this.player.id, playerName, "#" + color)
        .then(response => {
          console.log(response.data.data);
        })
        .catch(error => {
          console.log(error);
        });
    });
  }

  createSocketConnection() {
    const ws = new WebSocket("ws://app-mobile-api.herokuapp.com");

    ws.onopen = function open(data) {
      //ws.send("something");
    };

    ws.onmessage = data => {
      if (!this.player.id) this.player = JSON.parse(data.data);
      //console.log(data);
    };
    return ws;
  }
}
