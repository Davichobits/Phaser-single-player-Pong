import { Scene } from "phaser";
import { gameState } from "../GameState";

export class BoardScene extends Scene {

  constructor() {
    super("BoardScene");
  }

  init() {
    gameState.reset();
  }

  create() {
    // Background
    // const background = this.add.image(0, 0, 'background');
    // background.setOrigin(0, 0);

    // input
    this.cursors = this.input.keyboard.createCursorKeys();

    // paddle
    this.paddle = this.physics.add.image(0, 0, 'paddle');
    this.paddle.body.immovable = true;

    // ball
    this.ball = this.physics.add.image(0, 0, 'ball');
    this.ball.setBounce(1, 1);
    this.ball.setVelocity(200, 200);

    // Randomize ball direction at beginning
    const speed = 250;
    const angle = Phaser.Math.FloatBetween(0, Math.PI * 2); // randomize angle 
    const velocityX = speed * Math.cos(angle);  // determine direction and speed of ball
    const velocityY = speed * Math.sin(angle);  // determine direction and speed of ball
    this.ball.setVelocity(velocityX, velocityY);

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
    this.scoreText = this.add.text(350, 10, gameState.getPoints(), { fontSize: '24px', fontFamily: 'monospace' });

    // Level
    this.add.text(12, 10, 'Level:', { fontSize: '24px', fontFamily: 'monospace' });
    this.levelText = this.add.text(100, 10, gameState.getLevel(), { fontSize: '24px', fontFamily: 'monospace' });

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
      this.scene.start("FinalScene");
    }
  }

  hitPaddle(paddle, ball) {
    gameState.addPoints(1);
    this.scoreText.setText(gameState.getPoints());
    this.sound.play('paddle');

    if (gameState.getPoints() === 3) {
      this.changeLevel(2, 300, 300);
    } else if (gameState.getPoints() === 7) {
      this.changeLevel(3, 350, 350);
    } else if (gameState.getPoints() === 12) {
      this.changeLevel(4, 400, 400);
    } else if (gameState.getPoints() === 18) {
      this.changeLevel(5, 450, 450);
    } else if (gameState.getPoints() === 25) {
      this.changeLevel(6, 500, 500);
    } else if (gameState.getPoints() === 33) {
      this.changeLevel(7, 550, 550);
    } else if (gameState.getPoints() === 42) {
      this.changeLevel(8, 600, 600);
    } else if (gameState.getPoints() === 52) {
      this.changeLevel(9, 650, 650);
    }
  }

  changeLevel(newLevel, velocityX, velocityY) {
    gameState.setLevel(newLevel);
    this.levelText.setText(gameState.getLevel());
    this.ball.setVelocity(velocityX, velocityY);
  }
}