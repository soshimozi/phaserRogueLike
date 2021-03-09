import Phaser from "phaser";
import WebFont from 'webfontloader';

export class BootScene extends Phaser.Scene {

  constructor() {
    super({ key: 'boot' });
  }

  create() {
    console.log('BootScene::create');
  }

  preload() {

    // ReSharper disable once TsResolvedFromInaccessibleModule
    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

    let text = this.add.text(screenCenterX,
      screenCenterY,
      'Please Wait ...',
      { fontSize: '16px', fontFamily: 'Arial', color: '#ffffff', align: 'center' });

    text.setOrigin(0.5, 0.5);

    this.scene.start('main');

  }
}
