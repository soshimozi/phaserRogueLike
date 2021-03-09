import { Entity } from './base-entity';
import { Player } from './player';

export class Floor extends Entity {
    constructor() {
        super(null);
        this.className = 'floor';
    }
    interact(player: Player): boolean {
        return true;
    }
}
