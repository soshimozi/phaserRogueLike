import Phaser, { FOREVER } from 'phaser';
import {Map, MAP_SIZE} from '../game-engine/dungeon/map';
import { Floor } from '../game-engine/entities/floor';
import { Monster } from '../game-engine/entities/monster';
import { Stairs } from '../game-engine/entities/stairs';

export class MainScene extends Phaser.Scene {
    map: Map;
    cells: Phaser.GameObjects.Rectangle[][];
    constructor() {
        super({ key: 'main' });
    }

    create() {
        this.map = this.registry.values.dungeon;
        console.log(this.map);

        this.cells = [];

         for (let y = 0; y < MAP_SIZE; y++) {
             const current: Phaser.GameObjects.Rectangle[] = [];

             this.cells.push(current);
             for (let x = 0; x < MAP_SIZE; x++) {
                current.push(this.add.rectangle(x * 16, y * 16, 16, 16, 0));
             }
         }

         this.input.keyboard.on('keyup', (event) => {

            const x = this.map.player.location.x;
            const y = this.map.player.location.y;

            let newX = x;
            let newY = y;

            if (event.keyCode === 37) {
                //  left
                newX--;
            } else if (event.keyCode === 39) {
                //  right
                newX++;
            } else if (event.keyCode === 38) {
                //  up
                newY--;
            } else if (event.keyCode === 40) {
                //  down
                newY++;
            }

            if (this.map.isInBounds(newX, newY)) {
                const tile = this.map.tileMap[newY][newX];
                let doMove = tile.interact(this.map.player);

                if (tile instanceof Stairs) {
                    this.map.level++;

                    const currentOpponentHp = this.map.currentOpponentHp;

                    this.map.generate();
                    this.map.currentOpponentHp = currentOpponentHp;
                } else if (this.map.player.hp <= 0) {
                    // player died
                    this.scene.start('game-over');
                } else if (tile instanceof Monster) {
                    let monster = tile as Monster;
                    this.map.currentOpponentHp  = monster.hp;

                    if (doMove && monster.isBoss) {
                        doMove = false;
                        this.scene.start('game-won');
                    }
                }

                if (doMove) {
                    this.map.tileMap[y][x] = new Floor();

                    this.map.tileMap[newY][newX] = this.map.player;
                    this.map.player.location.x = newX;
                    this.map.player.location.y = newY;

                    this.map.hideVisibleArea();
                    this.map.setVisibleArea();
                }
            }
        });
    }

    update() {
        for (let y = 0; y < MAP_SIZE; y++) {
            for (let x = 0; x < MAP_SIZE; x++) {
                if (this.map.tileMap[y][x].show) {
                    switch (this.map.tileMap[y][x].className) {
                        case 'empty':
                            this.cells[y][x].fillColor = 0x696969;
                            break;
                        case 'floor':
                            this.cells[y][x].fillColor = 0xffffff;
                            break;
                        case 'hidden':
                            this.cells[y][x].fillColor = 0;
                            break;
                        case 'monster':
                            this.cells[y][x].fillColor = 0xff0000;
                            break;
                        case 'stairs':
                            this.cells[y][x].fillColor = 0x663399;
                            break;
                        case 'weapon':
                            this.cells[y][x].fillColor = 0xffa500;
                            break;
                        case 'health':
                            this.cells[y][x].fillColor = 0x32cd32;
                            break;
                    }
                } else {
                    this.cells[y][x].fillColor = 0;
                }
            }
        }

        this.cells[this.map.player.location.y][this.map.player.location.x].fillColor = 0x0000ff;
    }
}
