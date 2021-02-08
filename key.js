export class Key {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.centerX = 0;
    this.centerY = 0;
    this.width = 0;
  }

  locateKey(stageWidth, stageHeight, code) {
    this.pad = 0.02 * stageHeight; //key의 padding
    this.keylen = (stageHeight - 6 * this.pad) * 0.2;
    this.keyWidth = this.keylen * 1.05;
    this.taback = stageWidth - (13 * this.keyWidth + 15 * this.pad);
    this.capsenter = (stageWidth - (11 * this.keyWidth + 14 * this.pad)) * 0.5;
    this.shift = (stageWidth - (10 * this.keyWidth + 13 * this.pad)) * 0.5;
    this.cmdalt = 1.5 * this.keyWidth;
    this.spacebar =
      stageWidth - (7 * this.keyWidth + 11 * this.pad + 2 * this.cmdalt);
    this.padding = 0.04 * stageHeight; //key의 padding

    //첫번째 줄
    if (code[0] == 1) {
      if (code[1] == 14) {
        this.x = (code[1] - 1) * this.keyWidth + code[1] * this.pad;
        this.y = this.pad;
        this.width = this.taback;
      } else {
        this.x = (code[1] - 1) * this.keyWidth + code[1] * this.pad;
        this.y = this.pad;
        this.width = this.keyWidth;
      }
    }
    //두번째 줄
    if (code[0] == 2) {
      if (code[1] == 1) {
        this.x = this.pad;
        this.y = this.keylen + 2 * this.pad;
        this.width = this.taback;
      } else {
        this.x =
          this.taback + (code[1] - 2) * this.keyWidth + code[1] * this.pad;
        this.y = this.keylen + 2 * this.pad;
        this.width = this.keyWidth;
      }
    }

    //세번째 줄
    if (code[0] == 3) {
      if (code[1] == 1) {
        this.x = this.pad;
        this.y = 2 * this.keylen + 3 * this.pad;
        this.width = this.capsenter;
      } else if (code[1] == 13) {
        this.x =
          this.capsenter + (code[1] - 2) * this.keyWidth + code[1] * this.pad;
        this.y = 2 * this.keylen + 3 * this.pad;
        this.width = this.capsenter;
      } else {
        this.x =
          this.capsenter + (code[1] - 2) * this.keyWidth + code[1] * this.pad;
        this.y = 2 * this.keylen + 3 * this.pad;
        this.width = this.keyWidth;
      }
    }

    //네번째 줄
    if (code[0] == 4) {
      if (code[1] == 1) {
        this.x = this.pad;
        this.y = 3 * this.keylen + 4 * this.pad;
        this.width = this.shift;
      } else if (code[1] < 12) {
        this.x =
          this.shift + (code[1] - 2) * this.keyWidth + code[1] * this.pad;
        this.y = 3 * this.keylen + 4 * this.pad;
        this.width = this.keyWidth;
      } else {
        this.x =
          this.shift + (code[1] - 2) * this.keyWidth + code[1] * this.pad;
        this.y = 3 * this.keylen + 4 * this.pad;
        this.width = this.shift;
      }
    }

    //다섯번째 줄
    if (code[0] == 5) {
      if (code[1] < 4) {
        this.x = (code[1] - 1) * this.keyWidth + code[1] * this.pad;
        this.y = 4 * this.keylen + 5 * this.pad;
        this.width = this.keyWidth;
      } else if (code[1] == 4) {
        this.x = (code[1] - 1) * this.keyWidth + code[1] * this.pad;
        this.y = 4 * this.keylen + 5 * this.pad;
        this.width = this.cmdalt;
      } else if (code[1] == 5) {
        this.x = 5 * this.pad + 3 * this.keyWidth + this.cmdalt;
        this.y = 4 * this.keylen + 5 * this.pad;
        this.width = this.spacebar;
      } else if (code[1] == 6) {
        this.x = 6 * this.pad + 3 * this.keyWidth + this.cmdalt + this.spacebar;
        this.y = 4 * this.keylen + 5 * this.pad;
        this.width = this.cmdalt;
      } else {
        this.x =
          code[1] * this.pad +
          (code[1] - 4) * this.keyWidth +
          2 * this.cmdalt +
          this.spacebar;
        this.y = 4 * this.keylen + 5 * this.pad;
        this.width = this.keyWidth;
      }
    }

    this.centerX = this.x + 0.5 * this.width;
    this.centerY = this.y + 0.5 * this.keylen;
  }

  drawBackground() {}

  drawKey(ctx, color) {
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.keylen);
  }

  drawText(ctx, color, keyname) {
    ctx.font = "2.5vh malgun gothic";
    ctx.fillStyle = color;
    ctx.fillText(
      keyname,
      this.x + this.padding,
      this.y + this.keylen - this.padding
    );
  }
}
