import * as PIXI from 'pixi.js'


const app = new PIXI.Application({
  backgroundColor: 0X000000,
  height: 400,
  width: 600
});
globalThis.__PIXI_APP__ = app;

document.body.appendChild(app.view);

// create a ball

const ball = new PIXI.Graphics();
ball.beginFill(0xFF0000);
ball.drawCircle(0, 0, 20)
ball.endFill();
ball.position.set(100, 100)
app.stage.addChild(ball);


let movingValuex = 5;
let movingValuey = 5;

// moving ball

app.ticker.add(() => {
  ball.x = ball.x + movingValuex;
  ball.y = ball.y + movingValuey;

  if (ball.y < 0 || ball.y > app.screen.height) {
    movingValuey = movingValuey * (-1);
  }
  if (ball.x < 0 || ball.x > app.screen.width) {
    movingValuex = movingValuex * (-1);
  }

})


