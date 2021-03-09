import { Entity } from './base-entity';
import { Player } from './player';

export class Stairs extends Entity {
    constructor() {
        super(null);
        this.className = 'stairs';
        this.tooltip = 'Stairs';
    }

    interact(player: Player): boolean {
        return false;
    }
}
