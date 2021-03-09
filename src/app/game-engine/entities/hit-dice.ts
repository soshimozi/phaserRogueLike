import { Random } from "../common";

export class Dice {
    static roll(value:string): number {
        let total = 0;

        // some monsters have damage that uses multiple dice in addition to multiple rolls
        let rolls = value.split('/');

        rolls.forEach(r => {
            let temp = value.split('d');
            let timesRoll = parseInt(temp[0]);
            let dieSides = parseInt(temp[1]);

            for(let i=0; i < timesRoll; i++) {
                total += Random.next(1, dieSides);
            }

        });

        return total;
    }
}