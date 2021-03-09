import { Point } from '../common';
import { Creature } from './creature';
import { Dice } from './hit-dice';
import { Monster } from './monster';
import { Weapon } from './weapon';

export class Player extends Creature {

    experienceLevels: number[];
    weapon: Weapon;
    location: Point;
    damageTaken: number;
    constructor() {
        super('You', 0, 1);
        this.weapon = new Weapon('1d2', 'Stick', 1);

        this.className = 'player';
        this.hp = 12;
        this.experienceLevels = [0, 20, 40, 80, 160, 320, 640, 1280, 2560, 5120, 10000, 20000,
            40000, 80000, 160000, 320000, 640000, 1280000, 2560000, 5120000, 10000000, 20000000,
            30000000, 40000000, 50000000, 60000000, 70000000, 80000000, 90000000, 100000000];

            this.damageTaken = -1;

            this.tooltip = this.name;
    }

    addHealth(increase: number) {
        this.hp += increase;
    }

    getAttackBonus(): number {
        if (this.level < 5) { return 0; }
        if (this.level < 10) { return 1; }
        if (this.level < 15) { return 2; }
        if (this.level < 20) { return 3; }
        return 4;
    }

    attack(opponent: Monster): boolean {
        this.weapon.damage = Dice.roll(this.weapon.damageRoll) + this.getAttackBonus();
        console.log('weapon.damage', this.weapon.damage);

        console.log('attacking', opponent.name);
        console.log('hp', opponent.hp);

        opponent.hp -= this.weapon.damage;
        opponent.damage = Dice.roll(opponent.damageRoll);

        this.damageTaken = opponent.damage;
        this.hp -= opponent.damage;

        if (this.hp <= 0) {
            this.hp = 0; // do not want ot display a negative number
            return false;
        }

        if (opponent.hp <= 0) {
            console.log('killed', opponent.name);
            opponent.hp = 0;
            this.gainXp(opponent.xp);
            return true;
        }

        return false;
    }

    gainXp(xp: number) {
        this.xp += xp;

        // increase level while level's xp is less than or equal to the player's xp
        let level = 0;
        this.experienceLevels.forEach(l => {
            if(l <= this.xp) {
                level++;
            }
        });

        this.level = level;
    }

    interact(player: Player): boolean {
        return true;
    }

}
