import {Component, Input, OnInit} from '@angular/core';
import { NgModel } from '@angular/forms';
import { Player } from '../game-engine/entities/player';
import { IInformation } from '../info-panel/info-panel.component';
import { observe } from 'rxjs-observe';

@Component({
    selector: 'app-user-info',
    templateUrl: './user-info.component.html'
})
export class UserInfoComponent implements OnInit {
    @Input() playerLevel: number;
    @Input() playerHp: number;
    @Input() playerWeaponName: string;
    @Input() playerWeaponDamageRoll: string;
    @Input() dungeonLevel: number;

    constructor() {
    }

    ngOnInit() {
    }
}
