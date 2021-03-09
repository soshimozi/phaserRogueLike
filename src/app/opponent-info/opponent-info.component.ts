import { Component, Input } from '@angular/core';
import { Weapon } from '../game-engine/entities/weapon';

@Component({
    selector: 'app-opponent-info',
    templateUrl: './opponent-info.component.html'
})
export class OpponentInfoComponent {
    @Input() weapon: Weapon;
    @Input() damageTaken: number;
    @Input() hp: number;
    constructor() {
    }
}
