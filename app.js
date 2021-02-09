import { Background } from "./background.js";
import { Key } from "./key.js";
import keybind from "./keybind.js";

class App {
  constructor() {
    this.inputbox = document.createElement("input");
    document.body.appendChild(this.inputbox);
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    this.background = new Background(15);

    this.angle = 0;
    this.onClicked = false;
    this.onKeyDowned = false;
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
    if (this.inputbox !== null) {
      this.inputbox.focus();
    }
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

    this.background.clickLight(this.ctx, this.stageWidth, this.stageHeight);

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
      this.key.drawCode(this.ctx, keybind[i][1], keybind[i][3]);
    }

    window.requestAnimationFrame(this.animate.bind(this));
  }

  onClick(e) {
    if (this.inputbox !== null) {
      this.inputbox.focus();
    }
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.background.start(
      e.offsetX,
      e.offsetY,
      this.stageWidth,
      this.stageHeight
    );
    this.onClicked = true;
  }

  onKeyDown(e) {
    this.keyname = e.key;
    this.keycode = e.code;
    this.onKeyDowned = true;
    for (var i = 0; i < keybind.length; i++) {
      if (
        keybind[i][2] == this.keyname ||
        this.keycode == "Key" + keybind[i][2] ||
        this.keycode == keybind[i][2]
      ) {
        this.centerLocate = this.key.locateKey(
          this.stageWidth,
          this.stageHeight,
          keybind[i][0]
        );
        var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        var oscillator = audioCtx.createOscillator();
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(
          keybind[i][4],
          audioCtx.currentTime
        ); // value in hertz
        oscillator.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.2);
      }
    }
    this.background.start(
      this.centerLocate[0],
      this.centerLocate[1],
      this.stageWidth,
      this.stageHeight
    );
    console.log(e);
  }
  onKeyUp(e) {
    this.keyname = "";
    this.keycode = "";
    this.onKeyDowned = false;
  }
}

window.onload = () => {
  new App();
};
