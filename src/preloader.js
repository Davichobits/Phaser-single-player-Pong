export class Preloader extends Phaser.Scene {
    constructor() {
        super({ key: "Preloader" });
    }

    preload() {
        // Load all the assets
        this.load.setPath("assets");
        this.load.image('ball', 'ball.png');
        this.load.image('paddle', 'paddle.png');
        this.load.image('background', 'background.png');
        // audios
        this.load.audio('wall', '/sounds/wall.wav');
        this.load.audio('paddle', '/sounds/paddle.wav');
        this.load.audio('lose', '/sounds/lose.wav');
    }

    create() {
        // When all the assets are loaded go to the next scene
        this.scene.start("MenuScene");
    }
}