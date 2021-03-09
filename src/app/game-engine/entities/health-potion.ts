import { Entity } from "./base-entity";
import { Dice } from "./hit-dice";
import { Player } from "./player";

export class HealthPotion extends Entity {
    hproll: string;
    hp: number;
    constructor() {

        super('Health Potion');
        this.hproll = '8d4';
        this.className = 'health';
        this.hp = Dice.roll(this.hproll);

        this.tooltip = `${this.name}\nHP: ${this.hp}`;
    }

    interact(player: Player): boolean {
        player.hp += this.hp;
        return true;
    }
}
