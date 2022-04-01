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

        // setup symbol container
        let slot = this.add.container(centerX, centerY)

        // add symbols
        let banana = this.add.sprite(-190, 0, 'banana').setScale(0.5)
        let blackberry = this.add.sprite(0, 0, 'blackberry').setScale(0.5)
        let cherry = this.add.sprite(200, 0, 'cherry').setScale(0.5)
        
        slot.add([ cherry, banana, blackberry ])

        // setup spin button
        this.spin = this.add.sprite(centerX, centerY + 200, 'spin')
            .setScale(0.5)
            .setInteractive()
            .on('pointerdown', () => this.startSpin())
        
        // setup bigwin text
        this.bigwin = this.add.sprite(centerX, centerY - 170, 'bigwin')
            .setScale(0.5)
        this.bigwin.visible = false
    }

    startSpin()
    {
        this.bigwin.visible = false

        // disable spin button until the spin process ends
        this.spin.disableInteractive()
        this.spin.setTint(0x808080)

        setTimeout(() => { 
            this.endSpin()
        }, 1000)
    }

    endSpin()
    {
        //TODO: only show bigwin if there are 3 matching symbols
        this.bigwin.visible = true
        
        // reset spin button
        this.spin.clearTint()
            .setInteractive()
    }
}