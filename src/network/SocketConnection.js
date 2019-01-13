"use strict";

import { resolve } from "path";

export default class SocketConnection {
  constructor() {
    this.player = {};
    this.createSocketConnection()
      .then(ws => {
        this.ws = ws;
      })
      .catch(error => console.error(error));
  }

  static initialize() {
    SocketConnection.getInstance();
    return SocketConnection.ws;
  }

  static getInstance() {
    if (SocketConnection.__proto__.instance)
      return SocketConnection.__proto__.instance;
    const socketConnection = new SocketConnection();
    SocketConnection.__proto__.instance = socketConnection;
    return socketConnection;
  }

  async createSocketConnection() {
    return new Promise((resolve, reject) => {
      const localUrl = "ws://localhost:8083";
      const herokuUrl = "wss://app-mobile-api.herokuapp.com";
      const socketUrl = herokuUrl;
      const ws = new WebSocket(socketUrl);

      ws.onopen = function open(data) {
        //ws.send("something");
        console.log("conn opened");
      };

      ws.onmessage = data => {
        if (!this.player.id) {
          this.player = JSON.parse(data.data);
          resolve(ws);
        }
      };
      setTimeout(() => reject(ws), 2000);
    });
  }
}
