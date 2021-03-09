import { Weapon } from './weapon';

export class WeaponFactory {
    static get(level: number): Weapon {
        const weapons: Weapon[] = [
            new Weapon('1d6', 'Dagger', 1),
            new Weapon('2d3', 'Spear', 2),
            new Weapon('2d4', 'Mace', 3),
            new Weapon('3d4', 'Long sword', 4),
            new Weapon('4d4', 'Two handed sword', 5),
        ];

        return weapons[level];
    }
}
