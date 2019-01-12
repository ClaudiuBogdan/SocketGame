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
    const chooseColorText = this.add.text(
      this.game.config.width / 2,
      this.game.config.height / 1.7,
      "Click me"
    );
    chooseColorText.setOrigin(0.5, 0);
    chooseColorText.setInteractive();
    chooseColorText.on("pointerdown", () => {
      // alert(document.getElementById("nameInput").value);
      let color = ColorUtil.getRandomColor();
      playerSprite.setTint(color);
      console.log(color);
      Request.postPlayerData();
    });
  }
}
