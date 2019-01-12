"use strict";
import Phaser from "phaser";
import IdleScene from "./scenes/idleScene";

export default class Game {
  constructor(canvasId) {
    console.log("Hello game from: ", canvasId);
    const idleScene = new IdleScene();
    const config = {
      type: Phaser.AUTO,
      parent: canvasId,
      width: 400,
      height: 800,
      scene: [idleScene],
      backgroundColor: "#abcdef"
    };

    const game = new Phaser.Game(config);
  }
}
