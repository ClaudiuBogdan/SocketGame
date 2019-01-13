import Phaser from "phaser";
import SocketConnection from "../network/SocketConnection";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  init() {}

  preload() {
    this.load.image("playerDot", require("assets/images/playerCircle.png"));
  }

  create() {
    console.log("GameScene");
    this.player = SocketConnection.getInstance().player;
    this.localPlayersList = [];
    this.localPlayersList.push(this.createMyPlayer(this.player));
    SocketConnection.getInstance().ws.onmessage = data => {
      let receivedData = JSON.parse(data.data);
      this.updatePlayers(receivedData.playersList);
      if (receivedData.removedPlayers.length > 0)
        this.removePlayers(receivedData.removedPlayers);
    };

    const nameLabelText = this.add.text(
      this.game.config.width / 2,
      this.game.config.height / 2,
      " Hi " + this.player.name
    );
    nameLabelText.setOrigin(0.5, 0.5);
  }

  updatePlayers(serverPlayersList) {
    //Create players spirte if not sprites enought
    //Set position and color to sprites
    serverPlayersList.forEach(player => {
      let localPlayer = this.localPlayersList.find(
        localPlayer => localPlayer.id === player.id
      );
      if (localPlayer) {
        //console.log("Found: " + localPlayer.name);
        localPlayer.posX = player.posX;
        localPlayer.posY = player.posY;
        localPlayer.container.x = player.posX;
        localPlayer.container.y = player.posY;
        if (localPlayer.color != player.color)
          this.setPlayerColor(localPlayer, player.color);
      } else {
        let newPlayer = this.createOtherPlayer(player);
        this.localPlayersList.push(newPlayer);
        console.log(newPlayer);
      }
    });
  }
  createOtherPlayer(player) {
    const playerContainer = this.add.container(player.posX, player.posY);
    const playerSprite = this.add.sprite(0, 0, "playerDot");
    playerSprite.setTint("0X" + player.color.substring(1, player.color.length));
    const playerNameText = this.add.text(0, 0, player.name);
    playerNameText.setOrigin(0.5, 0.5);
    playerContainer.add(playerSprite);
    playerContainer.add(playerNameText);
    player.container = playerContainer;
    player.sprite = playerSprite;
    return player;
  }

  removePlayers(removedPlayersList) {
    removedPlayersList.forEach(player => {
      let localPlayer = this.localPlayersList.find(
        localPlayer => localPlayer.id === player.id
      );
      if (localPlayer) {
        let playerIndex = this.localPlayersList.indexOf(localPlayer);
        localPlayer.container.destroy();
        this.localPlayersList.splice(playerIndex, 1);
      }
    });
  }

  createMyPlayer(player) {
    const playerContainer = this.add.container(player.posX, player.posY);
    const playerSprite = this.add.sprite(0, 0, "playerDot");
    playerSprite.setTint("0X" + player.color.substring(1, player.color.length));
    playerSprite.setInteractive({ draggable: true, pixelPerfect: true });
    playerSprite.on("drag", (pointer, dragX, dragY) => {
      SocketConnection.getInstance().ws.send(
        JSON.stringify({
          id: this.player.id,
          posX: pointer.x,
          posY: pointer.y
        })
      );
    });
    const playerNameText = this.add.text(0, 0, player.name);
    playerNameText.setOrigin(0.5, 0.5);
    playerContainer.add(playerSprite);
    playerContainer.add(playerNameText);
    player.container = playerContainer;
    player.sprite = playerSprite;
    return player;
  }

  setPlayerColor(player, color) {
    player.sprite.setTint("0X" + color.substring(1, color.length));
    player.color = color;
    console.log("color set: ", color);
  }
}
