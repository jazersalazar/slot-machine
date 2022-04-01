import Phaser from "phaser"

export default class GameScene extends Phaser.Scene
{
    constructor()
    {
        super('GameScene')
    }

    preload()
    {
        // backgrounds
        this.load.image('background', 'images/Background.png')
        this.load.image('tool_background', 'images/CheatToolBackground.png')

        // ui elements
        this.load.image('tool_input', 'images/CheatToolInput.png')
        this.load.image('arrow', 'images/Arrow.png')
        this.load.image('spin', 'images/Spin.png')
        this.load.image('bigwin', 'images/Win.png')

        // symbols
        this.load.image('banana', 'images/Banana.png')
        this.load.image('blackberry', 'images/Blackberry.png')
        this.load.image('cherry', 'images/Cherry.png')
    }

    create()
    {
        // get the center position of the scene
        let centerX = this.cameras.main.width / 2
        let centerY = this.cameras.main.height / 2
        this.background = this.add.image(centerX, centerY, 'background')

        // make the background image cover the scene size 
        this.background.displayWidth = this.sys.canvas.width
        this.background.displayHeight = this.sys.canvas.height

        // this.add.image(centerX, centerY, 'bananas')
    }
}