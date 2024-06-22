export class Preloader extends Phaser.Scene {
    constructor() {
        super({ key: "Preloader" });
    }

    preload() {
        // Load all the assets
        this.load.setPath("assets");
        this.load.image('ball', 'ball.png');
        this.load.image('paddle', 'paddle.png');
    }

    create() {
        // When all the assets are loaded go to the next scene
        this.scene.start("MenuScene");
    }
}