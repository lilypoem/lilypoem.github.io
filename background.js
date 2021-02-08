import { distance } from "./utils.js";

export class Background {
  constructor(speed) {
    this.speed = speed;
    this.x = 0;
    this.y = 0;
    this.clickX = 0;
    this.clickY = 0;
    this.bRadius = 0;
    this.sRadius = 0;
  }

  start(x, y, width, height) {
    this.clickX = x;
    this.clickY = y;
    this.bRadius = 10; //초반 클릭 시 반지름
    this.sRadius = 0;
    this.maxRadius = this.getMax(this.clickX, this.clickY, width, height);
    console.log(this.maxRadius);
  }

  clickLight(ctx, stageWidth, stageHeight) {
    if (this.sRadius < this.maxRadius) {
      this.bRadius += this.speed;
      this.sRadius += this.speed;
    } else {
      return;
    }

    ctx.beginPath();
    var g = ctx.createRadialGradient(
      //도형의 배경에 그라데이션 효과 지정
      this.clickX,
      this.clickY,
      this.bRadius * 0.5,
      this.clickX,
      this.clickY,
      this.bRadius
    );
    g.addColorStop(0, `rgba(45,74,227, 1)`);
    g.addColorStop(1, `rgba(45,74,227, 0)`);
    ctx.fillStyle = g;
    ctx.arc(this.clickX, this.clickY, this.bRadius, Math.PI * 2, false);
    ctx.fill();

    ctx.beginPath();
    g = ctx.createRadialGradient(
      //도형의 배경에 그라데이션 효과 지정
      this.clickX,
      this.clickY,
      this.sRadius * 0.5,
      this.clickX,
      this.clickY,
      this.sRadius
    );
    g.addColorStop(0, `rgba(14,241,254, 1)`);
    g.addColorStop(1, `rgba(14,241,254, 0)`);
    ctx.fillStyle = g;
    ctx.arc(this.clickX, this.clickY, this.sRadius, Math.PI * 2, false);
    ctx.fill();
  }

  getMax(x, y, width, height) {
    const c1 = distance(0.05 * width, (height - 0.3 * width) * 0.5, x, y); //원점(좌측위)과 x,y좌표 사이의 거리(대각선)
    const c2 = distance(0.95 * width, (height - 0.3 * width) * 0.5, x, y); //우측위랑
    const c3 = distance(
      0.05 * width,
      (height - 0.3 * width) * 0.5 + 0.3 * width,
      x,
      y
    ); //좌측아래랑
    const c4 = distance(
      0.95 * width,
      (height - 0.3 * width) * 0.5 + 0.3 * width,
      x,
      y
    ); //우측아래랑
    return Math.max(c1, c2, c3, c4);
  }
}
