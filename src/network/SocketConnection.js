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
      const ws = new WebSocket("ws://app-mobile-api.herokuapp.com");

      ws.onopen = function open(data) {
        //ws.send("something");
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
