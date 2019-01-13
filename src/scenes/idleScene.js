"use strict";
import Phaser from "phaser";
import ColorUtil from "../util/ColorUtil";
import Request from "../network/Request";
import SocketConnection from "../network/SocketConnection";

export default class IdleScene extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.image("playerDot", require("assets/images/playerCircle.png"));
  }

  create() {
    this.player = SocketConnection.__proto__.instance.player;
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
      this.player = SocketConnection.getInstance().player;
      let playerName = document.getElementById("nameInput").value;
      Request.postPlayerData(this.player.id, playerName, "#" + color)
        .then(response => {
          SocketConnection.getInstance().player.name = response.data.data.name;
          SocketConnection.getInstance().player.color =
            response.data.data.color;
          document.body.removeChild(document.getElementById("nameInput"));

          this.startGame();
        })
        .catch(error => {
          console.log(error);
        });
    });
  }

  startGame() {
    // this.scene.transition({
    //   target: "GameScene",
    //   duration: 1,
    //   onUpdate: this.transitionOut,
    //   moveAbove: true,
    //   data: { from: "GameScene" }
    // });
    this.scene.start("GameScene", { from: "finishScene" });
  }
}
