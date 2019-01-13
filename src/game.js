"use strict";
import Phaser from "phaser";
import IdleScene from "./scenes/idleScene";
import GameScene from "./scenes/gameScene";
import SocketConnection from "./network/SocketConnection";

export default class Game {
  constructor(canvasId) {
    console.log("Hello game from: ", canvasId);
    const idleScene = new IdleScene();
    const gameScene = new GameScene();
    const config = {
      type: Phaser.AUTO,
      parent: canvasId,
      width: 400,
      height: 800,
      scene: [idleScene, gameScene],
      backgroundColor: "#abcdef"
    };

    SocketConnection.initialize();
    const game = new Phaser.Game(config);
  }
}
