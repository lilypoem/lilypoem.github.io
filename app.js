import { Background } from "./background.js";
import { Key } from "./key.js";
import keybind from "./keybind.js";

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    this.background = new Background(15);

    this.angle = 0;
    this.onClicked = false;
    this.fontcolor = `rgba(14,241,254, 1)`;
    this.keyname = "";
    this.keycode = "";

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    this.key = new Key();

    window.requestAnimationFrame(this.animate.bind(this));

    this.canvas.addEventListener("click", this.onClick.bind(this), false);
    window.addEventListener("keydown", this.onKeyDown.bind(this), false);
    window.addEventListener("keyup", this.onKeyUp.bind(this), false);
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    this.ctx.translate(this.stageWidth / 2, this.stageHeight / 2);
    this.ctx.rotate((Math.PI / 180) * -this.angle);
    this.ctx.translate(-this.stageWidth / 2, -this.stageHeight / 2);
  }

  animate(t) {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    for (var i = 0; i < keybind.length; i++) {
      this.key.drawKey(
        this.ctx,
        this.stageWidth,
        this.stageHeight,
        keybind[i][0],
        keybind[i][1]
      );
    }
    if (this.onClicked) {
      this.background.clickLight(this.ctx, this.stageWidth, this.stageHeight);
    }
    for (var i = 0; i < keybind.length; i++) {
      if (
        keybind[i][2] == this.keyname ||
        this.keycode == "Key" + keybind[i][2]
      ) {
        this.fontcolor = `rgba(45,74,227, 0.9)`;
      } else {
        this.fontcolor = `rgba(14,241,254, 1)`;
      }
      this.key.locateKey(this.stageWidth, this.stageHeight, keybind[i][0]);
      this.key.drawKey(this.ctx, keybind[i][1]);
      this.key.drawText(this.ctx, this.fontcolor, keybind[i][2]);
    }

    window.requestAnimationFrame(this.animate.bind(this));
  }

  onClick(e) {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.background.start(
      e.offsetX,
      e.offsetY,
      this.stageWidth,
      this.stageHeight
    );
    this.onClicked = true;
    textarea.focus();
  }

  onKeyDown(e) {
    this.keyname = e.key;
    this.keycode = e.code;
    console.log(e);
  }
  onKeyUp(e) {
    this.keyname = "";
    this.keycode = "";
  }
}

window.onload = () => {
  new App();
};
