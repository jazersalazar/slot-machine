import Phaser from "phaser"

export default class GameScene extends Phaser.Scene
{
    slots = [
        ['cherry', 'blackberry', 'banana', 'banana', 'cherry', 'blackberry'],
        ['banana', 'cherry', 'blackberry', 'cherry', 'banana', 'blackberry'],
        ['blackberry', 'banana', 'cherry', 'banana', 'blackberry', 'cherry']
    ]
    reels = []

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

        // setup the reels
        let reelPosX = [-191, 0, 200]
        for (let x = 0; x < this.slots.length; x++) {
            this.reels[x] = this.add.container(centerX + reelPosX[x], centerY)
            this.reels[x].symbols = this.slots[x]
            this.reels[x].position = 0

            for (let y = 0; y < this.slots[x].length; y++) {
                let symbol = this.add.sprite(0, 0, this.slots[x][y]).setScale(0.5)
                this.reels[x].add(symbol)
            }
        }

        // setup spin button
        this.spinBtn = this.add.sprite(centerX, centerY + 200, 'spin')
            .setScale(0.5)
            .setInteractive()
            .on('pointerdown', () => this.startSpin())
        
        // setup bigwin text
        this.bigwinTxt = this.add.sprite(centerX, centerY - 170, 'bigwin')
            .setScale(0.5)
        this.bigwinTxt.visible = false
    }

    startSpin()
    {
        this.bigwinTxt.visible = false

        // disable spin button until the spin process ends
        this.spinBtn.disableInteractive()
        this.spinBtn.setTint(0x808080)

        // intialize stop time for the reels
        let duration = Phaser.Math.FloatBetween(0, 3)

        for (let x = 0; x < this.reels.length; x++) {
            if (x > 0) {
                let addTime = Phaser.Math.FloatBetween(1, 3)
                this.reels[x].duration = this.reels[x - 1].duration + addTime
            } else {
                this.reels[x].duration = duration
            }

            this.reels[x].spin = this.time.addEvent({
                delay: 100,
                callback: () => { this.spin(x) },
                callbackScope: this,
                loop: true
            })   
        }
    }

    spin(index) 
    {
        let reel = this.reels[index]

        // iterate through the symbol index
        reel.position++
        if (reel.position >= reel.symbols.length) {
            this.reels[index].position = 0
        }

        // stop the event once the duration down to 0
        reel.duration -= reel.spin.delay / 1000
        if (reel.duration <= 0) {
            reel.spin.remove()
            
            // call the endSpin if the last reels has been stopped
            if (index == this.reels.length - 1) {
                this.endSpin()
            }
        }

        // apply the value changes to the actual objectj
        this.reels[index] = reel
    }

    endSpin() {
        let symbols = []
        for (let x = 0; x < this.reels.length; x++) {
            symbols[x] = this.reels[x].symbols[this.reels[x].position]
        }

        // display bigwin text
        if (symbols[0] === symbols[1] && symbols[1] === symbols[2]) {
            this.bigwinTxt.visible = true
        }

        // reset spin button
        this.spinBtn.clearTint()
            .setInteractive()
    }
}