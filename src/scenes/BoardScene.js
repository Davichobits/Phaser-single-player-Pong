import { Scene } from "phaser";

export class BoardScene extends Scene {
  points = 0;
  scoreText = null;

  constructor() {
    super("BoardScene");
  }

  init() {
    // Reset points
    this.points = 0;
  }

  create() {
    // input
    this.cursors = this.input.keyboard.createCursorKeys();

    // paddle
    this.paddle = this.physics.add.image(0, 0, 'paddle');
    this.paddle.body.immovable = true;

    // ball
    this.ball = this.physics.add.image(0, 0, 'ball');
    this.ball.setBounce(1, 1);
    this.ball.setVelocity(200, 200);

    // Collisions
    this.physics.world.checkCollision.down = false
    this.ball.setCollideWorldBounds(true);
    this.paddle.setCollideWorldBounds(true);
    this.physics.add.collider(this.paddle, this.ball, this.hitPaddle, null, this);

    //  Center the sprite to the picture
    Phaser.Display.Align.In.Center(this.paddle, this.add.zone(200, 570, 400, 600));
    Phaser.Display.Align.In.Center(this.ball, this.add.zone(200, 100, 400, 600));

    // Score
    this.add.text(12, 10, 'Score:', { fontSize: '24px', fontFamily: 'monospace' });
    this.scoreText = this.add.text(100, 10, this.points, { fontSize: '24px', fontFamily: 'monospace' });
  }
  update() {
    this.paddle.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.paddle.setVelocityX(-400);
    }
    else if (this.cursors.right.isDown) {
      this.paddle.setVelocityX(400);
    }

    if (this.ball.y > this.scale.height) {
      this.physics.pause();
      this.ball.setTint(0xff0000);
    }
  }

  hitPaddle(paddle, ball) {
    this.points += 1;
    this.scoreText.setText(this.points);
  }
}