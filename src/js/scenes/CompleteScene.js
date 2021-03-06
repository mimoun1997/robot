import Phaser from 'phaser'

export default class CompleteScene extends Phaser.Scene {
  constructor (test) {
    super({
      key: 'CompleteScene'
    })
    this.score = NaN
    this.coinValue = 10
  }

  init (data) {
    let coins = this.registry.get('coins_current')
    let levelAScore = this.registry.get('score')
    console.log('lvelA SCORE: ', levelAScore)
    console.log('lvelA coins_current: ', coins)
    this.registry.set('score', levelAScore + (coins * this.coinValue))
    this.score = this.registry.get('score')

    // set highscore in localstorage
    let highScore = this.registry.get('high_score')
    localStorage.setItem('high_score', highScore > this.score ? highScore : this.score)
  }

  create () {
    this.cameras.main.setBackgroundColor('#021f28')

    let overText = this.add.text(0, 0,
      'LEVEL COMPLETE!',
      {
        font: '97px arcade',
        fill: '#fff'
      })

    let HICHSCORE = this.registry.get('high_score')
    if (this.score > HICHSCORE) {
      HICHSCORE = this.score
    }
    let scoreText = this.add.text(0, 0,
      'High score ' + HICHSCORE,
      {
        font: '56px arcade',
        fill: '#009688'
      })

    let highScore = this.add.text(0, 0,
      'score ' + this.score,
      {
        font: '96px arcade',
        fill: '#2196f3'
      })

    let menuText = this.add.text(0, 0, 'MENU', {
      font: '56px arcade',
      fill: '#f4fc07'
    }).setInteractive()

    // Input Event listeners
    menuText.on('pointerover', () => { menuText.setTint(0x2bff2b) })
    menuText.on('pointerout', () => { menuText.clearTint() })
    menuText.on('pointerdown', () => { this.startGame() })

    //  Center the texts in the game
    Phaser.Display.Align.In.Center(
      overText,
      this.add.zone(this.sys.game.config.width / 2, this.sys.game.config.height / 5, this.sys.game.config.width, this.sys.game.config.height)
    )
    Phaser.Display.Align.In.Center(
      scoreText,
      this.add.zone(this.sys.game.config.width / 2, this.sys.game.config.height / 3, this.sys.game.config.width, this.sys.game.config.height)
    )
    Phaser.Display.Align.In.Center(
      highScore,
      this.add.zone(this.sys.game.config.width / 2, this.sys.game.config.height / 2, this.sys.game.config.width, this.sys.game.config.height)
    )
    Phaser.Display.Align.In.Center(
      menuText,
      this.add.zone(this.sys.game.config.width / 2, this.sys.game.config.height - menuText.displayHeight, this.sys.game.config.width, this.sys.game.config.height)
    )
  }

  startGame () {
    location.reload()
    // this.scene.stop().start('MenuScene')
  }
}
