import { Entity } from './base-entity';
import { Player } from './player';

export class Empty extends Entity {
    constructor() {
        super(null);
        this.className = 'empty';
    }
    interact(player: Player): boolean {
        return false;
    }
}
