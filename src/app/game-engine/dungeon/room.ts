import { Point, Random } from '../common';
import { Entity } from '../entities/base-entity';
import { Floor } from '../entities/floor';
import { HealthPotion } from '../entities/health-potion';
import { Monster } from '../entities/monster';
import { MonsterFactory } from '../entities/monster-factory';
import { Weapon } from '../entities/weapon';

export class Room {
    x: number;
    y: number;
    w: number;
    h: number;
    center: Point;
    monster: Monster;
    healthPotion: HealthPotion;
    weapon: Weapon;
    usedPoints: string[];

    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.center = new Point(this.x + Math.floor(this.w / 2), Math.floor(this.y + this.h / 2 ));
        this.usedPoints = [];
    }

    addMonster(level: number): boolean {
        if (Math.random() < 0.5) {
            this.monster = new MonsterFactory().random(level);

            const point = this.unusedPoint();
            this.usedPoints.push(point.toString());
            this.monster.location = point;

            return true;
        }

        return false;
    }

    addHealthPotion(): boolean {
        if (Math.random() < 0.25) {
            this.healthPotion = new HealthPotion();

            const point = this.unusedPoint();
            this.usedPoints.push(point.toString());
            this.healthPotion.location = point;
            return true;
        }

        return false;
    }

    unusedPoint(): Point {
        // random x and y
        let x = Random.next(this.x + 1, this.x + this.w - 1);
        let y = Random.next(this.y + 1, this.y + this.h - 1);
        let found = false;

        while (!found) {
            // is it empty?
            const point = `${x},${y}`;
            if (this.usedPoints.indexOf(point) === -1) {
                found = true;
            }

            x = Random.next(this.x + 1, this.x + this.w - 1);
            y = Random.next(this.y + 1, this.y + this.h - 1);
        }

        return new Point(x, y);
    }

    addRoom(mapTiles: Entity[][]) {
        for (let x = this.x; x <= this.w; x++) {
            for (let y = this.y; y <= this.h; y++) {
                mapTiles[x][y] = new Floor();
            }
        }
    }

    addPath(maptTiles: Entity[][], point: Point) {
        for(let y = this.center.y; y <= point.y; y++) {
            for(let x = this.center.x; x <= point.x; x++) {
                maptTiles[y][x] = new Floor();
            }
        }
    }
}
