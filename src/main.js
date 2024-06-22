import { Game } from "phaser";
import { Preloader } from "./preloader";
import { BoardScene } from "./scenes/BoardScene";
import { MenuScene } from "./scenes/MenuScene";

const config = {
    type: Phaser.AUTO,
    parent: "phaser-container",
    width: 400,
    height: 600,
    backgroundColor: "#1c172e",
    pixelArt: true,
    roundPixel: false,
    max: {
        width: 800,
        height: 1200,
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: [
        Preloader,
        MenuScene,
        BoardScene
    ]
};

new Game(config);