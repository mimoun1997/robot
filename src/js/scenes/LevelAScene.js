/* global Phaser:true */

import Constants from '../utils/Constants'
import Player from '../objects/Player'

class LevelAScene extends Phaser.Scene {
  constructor (test) {
    super({
      key: 'LevelAScene'
    })
  }

  create () {
    console.debug('LevelAScene: init()')

    this.cameras.main.backgroundColor.setTo(0, 188, 212)

    this.titleText = this.add.text(0, 0, 'Level A', {
      font: '97px arcade',
      fill: '#fff'
    })

    this.alignElements()

    this.createLevel()

    const spawnPoint = this.map.findObject('Objects', obj => obj.name === 'Spawn Point')

    console.log('Spawn Point: ', spawnPoint)

    this.player = new Player(this, spawnPoint.x, spawnPoint.y)

    // this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'player')

    this.physics.add.collider(this.player, this.WorldLayer)

    this.camera.startFollow(this.player)

    console.log('ZOOM: ', this.camera.zoom)

    console.log('OKKKKKKKKKKKKKKKKKKK')
  }

  update (time, delta) {
    this.player.update()
  }

  alignElements () {
    Phaser.Display.Align.In.Center(
      this.titleText,
      this.add.zone(Constants.WIDTH / 2, Constants.HEIGHT / 2 - this.titleText.displayHeight / 2, Constants.WIDTH, Constants.HEIGHT)
    )
  }

  startGame () {
    this.scene.stop().start('LevelBScene')
    // this.scene.start('LevelBScene')
  }

  createLevel () {
    console.log('sadsadsa')
    // Load a map from a 2D array of tile indices
    // When loading a CSV map, make sure to specify the tileWidth and tileHeight!
    this.map = this.make.tilemap({ key: 'map' })
    const tileset = this.map.addTilesetImage('RobotTileset', 'tiles')
    this.WorldLayer = this.map.createStaticLayer('World', tileset, 0, 0) // layer index, tileset, x, y
    this.BackgroundLayer = this.map.createStaticLayer('Background', tileset, 0, 0) // layer index, tileset, x, y

    // collision
    this.WorldLayer.setCollisionByProperty({ collides: true })

    const debugGraphics = this.add.graphics().setAlpha(0.75)
    this.WorldLayer.renderDebug(debugGraphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    })

    // Phaser supports multiple cameras, but you can access the default camera like this:
    this.camera = this.cameras.main
    this.camera.zoom = 3

    // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
    this.camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)

    // Help text that has a "fixed" position on the screen
    this.add
      .text(16, 16, 'Arrow keys to scroll', {
        font: '18px monospace',
        fill: '#ffffff',
        padding: { x: 20, y: 10 },
        backgroundColor: '#000000'
      })
      .setScrollFactor(0)
  }
}

export default LevelAScene