import { Entity } from './base-entity';

export abstract class Creature extends Entity {

    hp: number;
    xp: number;
    level: number;

    constructor(name: string, xp: number, level: number) {
        super(name);
        this.xp = xp;
        this.level = level;
    }
}
