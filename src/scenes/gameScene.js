import Phaser from "phaser";
import SocketConnection from "../network/SocketConnection";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  init() {}

  preload() {}

  create() {
    console.log("GameScene");
    this.player = SocketConnection.getInstance().player;
    SocketConnection.getInstance().ws.onmessage = data => {
      console.log(JSON.parse(data.data));
    };

    const nameLabelText = this.add.text(
      this.game.config.width / 2,
      this.game.config.height / 2,
      " Hi " + this.player.name
    );
    nameLabelText.setOrigin(0.5, 0.5);
    console.log(this.player);
  }
}
