import { Scene } from "phaser";

export class BoardScene extends Scene {
  points = 0;
  scoreText = null;
  level = 1;
  levelText = null;

  constructor() {
    super("BoardScene");
  }

  init() {
    this.points = 0;
    this.level = 1;
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
    this.add.text(250, 10, 'Score:', { fontSize: '24px', fontFamily: 'monospace' });
    this.scoreText = this.add.text(350, 10, this.points, { fontSize: '24px', fontFamily: 'monospace' });

    // Level
    this.add.text(12, 10, 'Level:', { fontSize: '24px', fontFamily: 'monospace' });
    this.levelText = this.add.text(100, 10, this.level, { fontSize: '24px', fontFamily: 'monospace' });

    // Lose condition
    this.hasLost = false;

    // Add world bounds collision event for the ball
    this.ball.body.onWorldBounds = true;
    this.physics.world.on('worldbounds', (body, up, down, left, right) => {
      if (body.gameObject === this.ball) {
        this.sound.play('wall');
      }
    });
  }
  update() {
    this.paddle.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.paddle.setVelocityX(-400);
    }
    else if (this.cursors.right.isDown) {
      this.paddle.setVelocityX(400);
    }

    if (this.ball.y > this.scale.height && !this.hasLost) {
      this.physics.pause();
      this.ball.setTint(0xff0000);
      this.sound.play('lose');
      this.hasLost = true;
    }
  }

  hitPaddle(paddle, ball) {
    this.points += 1;
    this.scoreText.setText(this.points);
    this.sound.play('paddle');

    if (this.points === 3) {
      this.changeLevel(2, 300, 300, 0xf48c06);
    } else if (this.points === 7) {
      this.changeLevel(3, 350, 350, 0xe85d04);
    } else if (this.points === 12) {
      this.changeLevel(4, 400, 400, 0xdc2f02);
    } else if (this.points === 18) {
      this.changeLevel(5, 450, 450, 0xd00000);
    } else if (this.points === 25) {
      this.changeLevel(6, 500, 500, 0x9d0208);
    } else if (this.points === 33) {
      this.changeLevel(7, 550, 550, 0x6a040f);
    } else if (this.points === 42) {
      this.changeLevel(8, 600, 600, 0x370617);
    } else if (this.points === 52) {
      this.changeLevel(9, 650, 650, 0x03071e);
    }
  }

  changeLevel(newLevel, velocityX, velocityY, backgroundColor) {
    this.level = newLevel;
    this.levelText.setText(this.level);
    this.ball.setVelocity(velocityX, velocityY);
    this.cameras.main.setBackgroundColor(backgroundColor);
  }
}