import { Creature } from './creature';
import { Dice } from './hit-dice';
import { Player } from './player';

export class Monster extends Creature {
    hpRoll: string;
    damageRoll: string;
    damage: number;
    isBoss: boolean;

    constructor(name: string, xp: number, level: number, hpRoll: string, damageRoll: string) {
        super(name, xp, level);

        this.hpRoll = hpRoll;
        this.damageRoll = damageRoll;
        this.className = 'monster';
    }
    calcHp() {
        this.hp = Dice.roll(this.hpRoll);
        this.tooltip = `${this.name}\nHP: ${this.hp}\nDamage: ${this.damageRoll}`;
    }

    interact(player: Player): boolean {
        return player.attack(this);
    }
}
