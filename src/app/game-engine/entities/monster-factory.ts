import { Random } from '../common';
import { Monster } from './monster';

export class MonsterFactory {
    monsters: any;

    constructor() {
        this.monsters = {
            1: [
                new Monster('Bat', 1, 1, '1d8', '1d2'),
                new Monster('Emu', 2, 1, '1d8', '1d2'),
                new Monster('Hobgoblin', 3, 1, '1d8', '1d8'),
                new Monster('Orc', 5, 1, '1d8', '1d8'),
            ],
            2: [
                new Monster('Rattlesnake', 9, 2, '2d8', '1d6'),
                new Monster('Snake', 1, 2, '1d8', '1d3'),
                new Monster('Zombie', 6, 2, '2d8', '1d8')
            ],
            3: new Monster('Quagga', 32, 3, '3d8', '1d2/1d2/1d4'),
            4: [
                new Monster('Centaur', 25, 4, '4d8', '1d2/1d5/1d5'),
                new Monster('Yeti', 50,	4, '4d8', '1d6/1d6')
            ],
            5: new Monster('Wraith', 55, 5, '5d8', '1d6'),
            6: new Monster('Troll', 120, 6, '6d8', '1d8/1d8/2d6'),
            7: [
                new Monster('Kestral', 1, 7, '1d8', '1d4'),
                new Monster('Ur-vile', 190, 7, '7d8', '1d3/1d3/1d3/4d6'),
                new Monster('Xeroc', 100, 7, '7d8', '3d4')
            ],
            8: [
                new Monster('Medusa', 200, 8, '8d8', '3d4/3d4/2d5'),
                new Monster('Phantom', 120, 8, '8d8', '4d4'),
                new Monster('Vampire', 350, 8, '8d8', '1d10')
            ],
            10: [
                new Monster('Dragon', 6800, 10, '10d8', '1d8/1d8/3d10'),
                new Monster('Leprechaun', 10, 3, '3d8', '1d2')
            ],
            15: new Monster('Jabberwock', 3000, 15, '15d8', '2d12/2d4'),
            20: new Monster('Griffin', 2000, 20, '13d8', '4d3/3d5/4d3')
        };
    }

    get(level: number, index: number): Monster {
        let monster: Monster;

        if (Array.isArray(this.monsters[level])) {
            monster = this.monsters[level][index];
        } else {
            monster = this.monsters[level];
        }

        return monster;
    }

    random(level: number): Monster {
        console.log('MonsterFactory::random level: ', level);

        const selectedMonsters: Monster[] = [];

        // get the monsters in levels 5 less that nor equal to the current dungeon level
        for (const monsterIndex in this.monsters) {
            if (this.monsters.hasOwnProperty(monsterIndex)) {
                const key = parseInt(monsterIndex, 10);

                if (key >= level - 5) {
                    if (Array.isArray(this.monsters[level])) {
                        this.monsters[level].forEach(m => {
                            selectedMonsters.push(m);
                        });

                    } else {
                        selectedMonsters.push(this.monsters[level]);
                    }
                }
            }
        }

        // retunr a random monster form the list
        const monster = selectedMonsters[Random.next(0, selectedMonsters.length - 1)];
        monster.calcHp();

        return monster;
    }
}
