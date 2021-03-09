import { Point, Random } from '../common';
import { Entity } from '../entities/base-entity';
import { Empty } from '../entities/empty';
import { Floor } from '../entities/floor';
import { MonsterFactory } from '../entities/monster-factory';
import { Player } from '../entities/player';
import { Stairs } from '../entities/stairs';
import { Weapon } from '../entities/weapon';
import { WeaponFactory } from '../entities/weapon-factory';
import { Room } from './room';
import { RoomContainer } from './room-container';
import { Tree } from './tree';

export const MAP_SIZE = 50;
export const W_RATIO = 0.45;
export const H_RATIO = 0.45;
export const DISCARD_BY_RATIO = true;
export const TOTAL_MAP_SIZE = 50; // to avoid boundary checks

export class Map {
    private N_ITERATIONS = 3;

    rooms: Room[];
    roomTree: Tree;
    level = 1;
    weapon: Weapon;
    stairs: Entity;
    player: Player;
    tileMap: Entity[][];
    currentOpponentHp: number;
    visibileTiles: string[];

    generate() {
        this.rooms = [];
        this.tileMap = new Array(TOTAL_MAP_SIZE);
        this.currentOpponentHp = -1;

        this.initTileMap();

        const main_room = new RoomContainer(0, 0, MAP_SIZE, MAP_SIZE);
        this.roomTree = this.split_room(main_room, this.N_ITERATIONS);

        this.growRooms();

        this.addPaths(this.roomTree);
        this.addEntities();
    }

    initTileMap() {
        for (let y = 0; y < TOTAL_MAP_SIZE; y++) {
            this.tileMap[y] = new Array<Empty>(TOTAL_MAP_SIZE);

            for (let x = 0; x <= TOTAL_MAP_SIZE; x++) {
                this.tileMap[y][x] = new Empty();
            }
        }
    }

    random_split(room: Room): RoomContainer[] {
        let r1, r2;
        if (Random.next(0, 1) === 0) {
            // Vertical
            r1 = new RoomContainer(
                room.x, room.y,
                Random.next(1, room.w), room.h
            );
            r2 = new RoomContainer(
                room.x + r1.w, room.y,
                room.w - r1.w, room.h
            );
            if (DISCARD_BY_RATIO) {
                const r1_w_ratio = r1.w / r1.h;
                const r2_w_ratio = r2.w / r2.h;
                if (r1_w_ratio < W_RATIO || r2_w_ratio < W_RATIO) {
                    return this.random_split(room);
                }
            }
        } else {
            // Horizontal
            r1 = new RoomContainer(
                room.x, room.y,
                room.w, Random.next(1, room.h)
            );
            r2 = new RoomContainer(
                room.x, room.y + r1.h,
                room.w, room.h - r1.h
            );
            if (DISCARD_BY_RATIO) {
                const r1_h_ratio = r1.h / r1.w;
                const r2_h_ratio = r2.h / r2.w;
                if (r1_h_ratio < H_RATIO || r2_h_ratio < H_RATIO) {
                    return this.random_split(room);
                }
            }
        }

        return [r1, r2];
    }

    split_room(room: RoomContainer, iterations: number): Tree {
        const root = new Tree(room);
        if ( iterations !== 0) {
            const sr: RoomContainer[] = this.random_split(room);
            root.lchild = this.split_room(sr[0], iterations - 1);
            root.rchild = this.split_room(sr[1], iterations - 1);
        }

        return root;
    }

    growRooms() {
        const leafs = this.roomTree.getLeafs();
        for (let i = 0; i < leafs.length; i++) {
            leafs[i].growRoom();
            this.rooms.push(leafs[i].room);

            this.addRoom(leafs[i].room);
        }
    }

    addRoom(room: Room) {
        for (let y = room.y; y < room.y + room.h; y++) {
            for (let x = room.x; x < room.x + room.w; x++) {
                this.tileMap[y][x] = new Floor();
            }
        }
    }

    addEntities() {
        for (let i = 0; i < this.rooms.length; i++) {
            const room = this.rooms[i];
            if (room.addMonster(this.level)) { this.addtoMap(room.monster, false); }

            if (room.addHealthPotion()) { this.addtoMap(room.healthPotion, false); }
        }

        // add boss monster for final level
        if (this.level === 20) {
            const bossMonster = new MonsterFactory().get(20, 0);
            bossMonster.isBoss = true;
            bossMonster.className = 'boss';
            this.addtoMap(bossMonster, true);
        }

        // add one set of stairs
        if (this.level < 20) {
            this.addtoMap(new Stairs(), true);
        }

        if (this.player === undefined) { this.player = new Player(); }

        // add one weapon unless the player alreayd has the best weapon
        if (this.player.weapon.level < 5) {
            this.addtoMap(WeaponFactory.get(this.level), true);
        }

        this.addtoMap(this.player, true);

        this.setVisibleArea();
    }

    addtoMap(entity: Entity, setRandomLocation: boolean) {
        if (setRandomLocation) { entity.location = this.getRandomPoint(); }
        this.tileMap[entity.location.y][entity.location.x] = entity;
    }

    hideVisibleArea() {
        this.visibileTiles.forEach(t => {
            const point = t.split(',');
            const x = point[0];
            const y = point[1];

            this.tileMap[y][x].show = false;
        });
    }

    isInBounds(x: number, y: number): boolean {
        return !(y < 0 || y > MAP_SIZE || x < 0 || x > MAP_SIZE);
    }

    setVisibleArea(): void {
        this.visibileTiles = [];
        const playerX = this.player.location.x;
        const playerY = this.player.location.y;

        const newX = playerX - 5;
        const newY = playerY - 2;
        const h = 4;
        let w = 10;

        for (let y = newY; y < newY + h; y++) {
            for (let x = newX; x < newX + w; x++) {
                if (this.isInBounds(x, y)) {
                    this.tileMap[y][x].show = true;
                    this.visibileTiles.push(`${x},${y}`);
                }
            }
        }

        let y1 = newY;
        let y2 = newY + h - 1;
        let x1 = newX;
        for (let i = 0; i < 3; i++) {
            x1++;
            y1--;
            y2++;

            w -= 2;
            for (let x = x1; x < x1 + w; x++) {
                if (this.isInBounds(x, y1)) {
                    this.tileMap[y1][x].show = true;
                    this.visibileTiles.push(`${x},${y1}`);
                }
            }
            for (let x = x1; x < x1 + w; x++) {
                if (this.isInBounds(x, y2)) {
                    this.tileMap[y2][x].show = true;
                    this.visibileTiles.push(`${x},${y2}`);
                }
            }
        }
    }

    getRandomPoint(): Point {
        return this.getRandomRoom().unusedPoint();
    }

    getRandomRoom(): Room {
        return this.rooms[Random.next(0, this.rooms.length - 1)];
    }

    addPaths(roomTree: Tree) {
        if (roomTree.lchild !== undefined && roomTree.rchild !== undefined) {
            roomTree.lchild.leaf.addPath(this.tileMap, roomTree.rchild.leaf.center);
            this.addPaths(roomTree.lchild);
            this.addPaths(roomTree.rchild);
        }
    }

    addRooms() {
        for (let i = 0; i < this.rooms.length; i++) {
            this.rooms[i].addRoom(this.tileMap);
        }
    }
}
