import { Scene } from "phaser";

export class MenuScene extends Scene {
  constructor() {
    super({ key: "MenuScene" });
  }


  create() {
    const gameWidth = this.scale.width
    const gameHeight = this.scale.height

    const title = this.add.text(gameWidth / 2, gameHeight / 2 - 50, "Pong", { fontSize: "32px", fill: "yellow", fontWeight: "bold", fontFamily: 'monospace' });
    title.setOrigin(0.5);

    const instructions = this.add.text(gameWidth / 2, gameHeight / 2, "Play using the arrow keys", { fontSize: "18px", fontFamily: 'monospace' });
    instructions.setOrigin(0.5);

    const playBtn = this.add.text(gameWidth / 2, gameHeight / 2 + 50, "PLAY", { fontSize: "32px", fontFamily: 'monospace' });
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
}