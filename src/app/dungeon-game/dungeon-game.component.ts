import {Component, OnInit} from '@angular/core';
import Phaser from 'phaser';
import ButtonPlugin from 'phaser3-rex-plugins/plugins/button-plugin.js';
import {BootScene} from '../game-scenes/boot-scene';
import {MainScene} from '../game-scenes/main-scene';
import { Map } from '../game-engine/dungeon/map';
import { Player } from '../game-engine/entities/player';

@Component({
    selector: 'app-dungeon-game',
    templateUrl: './dungeon-game.component.html'
 })
export class DungeonGameComponent implements OnInit {
    phaserGame: Phaser.Game;
    config: Phaser.Types.Core.GameConfig;
    dungeon: Map;
    instructions: string[];
    constructor() {
      this.config = {
        type: Phaser.WEBGL,
        plugins: [
          {
            key: 'rexButton',
            plugin: ButtonPlugin,
            start: true
          }
        ],
        height: 800,
        width: 800,
        scene: [BootScene, MainScene],
        parent: 'gameContainer',
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { y: 100 }
          }
        }
      };

      this.instructions = [];

    }

    ngOnInit() {
      this.dungeon = new Map();
      this.dungeon.generate();

      this.phaserGame = new Phaser.Game(this.config);
      this.phaserGame.registry.set('dungeon', this.dungeon);

      this.instructions.push('Use arrow keys to move.');
      this.instructions.push('To obtain an item or to attack a monster, move over the square.');
      this.instructions.push('Hover over a square to see its properties.');
      this.instructions.push('Defeat boss in level 20.');
    }
}

