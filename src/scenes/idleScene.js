"use strict";
import Phaser from "phaser";

export default class IdleScene extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {}

  create() {
    const helloText = this.add.text(
      this.game.config.width / 2,
      this.game.config.height / 2,
      "Hello from the scene"
    );
    helloText.setOrigin(0.5, 0);
  }
}
