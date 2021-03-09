import { Random } from '../common';
import { Room } from './room';

export class RoomContainer extends Room {
    room: Room;
    constructor(x, y, w, h) {
        super(x, y, w, h);
    }

    growRoom() {
        let x, y, w, h;

        x = this.x + Random.next(0, Math.floor(this.w / 3));
        y = this.y + Random.next(0, Math.floor(this.h / 3));
        w = this.w - (x - this.x);
        h = this.h - (y - this.y);
        w -= Random.next(0, w / 3);
        h -= Random.next(0, h / 3);
        this.room = new Room(x, y, w, h);
    }
}
