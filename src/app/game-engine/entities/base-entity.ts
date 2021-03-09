import Phaser from 'phaser';
import { Point } from '../common';
import { Player } from './player';

export abstract class Entity {
    name: string;
    location: Point;
    className: string;
    tooltip: string;
    show: boolean;

    constructor(name: string) {
        this.name = name;
        this.show = false;
    }

    abstract interact(player: Player): boolean;

}
