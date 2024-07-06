import { Game } from "phaser";
import { Preloader } from "./preloader";
import { BoardScene } from "./scenes/BoardScene";
import { MenuScene } from "./scenes/MenuScene";
import { FinalScene } from "./scenes/FinalScene";
import { AnimatedBackground } from "./scenes/AnimatedBackground";

const config = {
    type: Phaser.AUTO,
    parent: "phaser-container",
    width: 448,
    height: 640,
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
        AnimatedBackground,
        MenuScene,
        BoardScene,
        FinalScene
    ]
};

new Game(config);