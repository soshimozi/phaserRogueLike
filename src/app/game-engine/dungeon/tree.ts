import { Entity } from '../entities/base-entity';
import { RoomContainer } from './room-container';

export class Tree {
    leaf: RoomContainer;
    lchild: Tree;
    rchild: Tree;
    constructor(leaf: RoomContainer) {
        this.leaf = leaf;
    }

    getLeafs(): RoomContainer[] {
        if (this.lchild === undefined && this.rchild === undefined) {
            return [this.leaf];
        } else {
            return [].concat(this.lchild.getLeafs(), this.rchild.getLeafs());
        }
    }
    add(maptiles: Entity[][]) {
        this.leaf.addRoom(maptiles);
        if (this.lchild !== undefined) {
            this.lchild.add(maptiles);
        }

        if(this.rchild !== undefined) {
            this.rchild.add(maptiles);
        }
    }
}
