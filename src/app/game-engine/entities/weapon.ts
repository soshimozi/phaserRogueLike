import { Entity } from './base-entity';
import { Player } from './player';

export class Weapon extends Entity {
    damageRoll: string;
    damage: number;
    level: number;

    constructor(damageRoll: string, name: string, level: number) {
        super(name);
        this.damageRoll = damageRoll;
        this.level = level;
        this.className = 'weapon';
        this.damage = -1;

        this.tooltip = `${this.name}\nDamage: ${this.damageRoll}`;
    }

    interact(player: Player): boolean {
        this.damage = player.weapon.damage; // keep damage form previous battle
        player.weapon = this;
        return true;
    }
}
