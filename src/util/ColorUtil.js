"use strict";

export default class ColorUtil {
  static getRandomColor() {
    let randomColor = "0x";
    randomColor += this.convertNumberToHex(
      Math.floor(Math.random() * 255 + 1).toString(16)
    );
    randomColor += this.convertNumberToHex(Math.floor(Math.random() * 255 + 1));
    randomColor += this.convertNumberToHex(Math.floor(Math.random() * 255 + 1));
    return randomColor;
  }

  static convertNumberToHex(num) {
    let hex = num.toString(16);

    return hex.length === 1 ? "0" + hex : hex;
  }
}
