import { Scene } from "phaser";
import { gameState } from "../GameState";

export class FinalScene extends Scene {


  constructor() {
    super({ key: "FinalScene" });
  }

  create() {
    const gameWidth = this.scale.width
    const gameHeight = this.scale.height

    // Score
    this.add.text(250, 10, 'Score:', { fontSize: '24px', fontFamily: 'monospace' });
    this.scoreText = this.add.text(350, 10, gameState.getPoints(), { fontSize: '24px', fontFamily: 'monospace' });

    // Level
    this.add.text(12, 10, 'Level:', { fontSize: '24px', fontFamily: 'monospace' });
    this.levelText = this.add.text(100, 10, gameState.getLevel(), { fontSize: '24px', fontFamily: 'monospace' });

    const title = this.add.text(gameWidth / 2, gameHeight / 2 - 50, "Pong", { fontSize: "32px", fill: "yellow", fontWeight: "bold", fontFamily: 'monospace' });
    title.setOrigin(0.5);

    // Play button
    const playBtn = this.add.text(gameWidth / 2, gameHeight / 2 + 50, "JUGAR DE NUEVO", { fontSize: "32px", fontFamily: 'monospace' });
    playBtn.setOrigin(0.5);
    playBtn.setInteractive({ useHandCursor: true });

    playBtn.on('pointerover', () => {
      playBtn.setStyle({ fill: '#ff0' });
    });

    playBtn.on('pointerout', () => {
      playBtn.setStyle({ fill: '#fff' });
    });

    playBtn.on('pointerdown', () => {
      this.scene.start("BoardScene");
    });
  }

  update() {
  }

}