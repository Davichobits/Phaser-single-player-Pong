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
    this.cursors = this.input.keyboard.createCursorKeys();

    this.paddle = this.physics.add.image(0, 0, 'paddle');

    this.physics.world.checkCollision.down = false

    this.paddle.body.immovable = true;
    // Collisiones bola
    this.ball = this.physics.add.image(0, 0, 'ball');
    this.ball.setCollideWorldBounds(true);

    this.ball.setBounce(1, 1); // Hacer que la bola rebote completamente
    this.ball.setVelocity(200, 200); // Ajusta las velocidades iniciales según sea necesario

    //  Center the sprite to the picture
    Phaser.Display.Align.In.Center(this.paddle, this.add.zone(200, 570, 400, 600));
    Phaser.Display.Align.In.Center(this.ball, this.add.zone(200, 100, 400, 600));

    // Habilitar colisiones con los límites del mundo
    this.paddle.setCollideWorldBounds(true);

    // Habilitar colisiones entre el paddle y la bola
    this.physics.add.collider(this.paddle, this.ball, this.hitPaddle, null, this);


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

    // Verificar si la bola ha caído en la parte inferior del área de juego
    if (this.ball.y > this.scale.height) {
      this.physics.pause(); // Detener la física del juego
      this.ball.setTint(0xff0000); // Cambiar el color de la bola a rojo para indicar el fin del juego (opcional)
    }

  }
  // Define la función de callback hitPaddle
  hitPaddle(paddle, ball) {
    // Incrementa el puntaje
    this.points += 1;
    this.scoreText.setText(this.points);
  }
}