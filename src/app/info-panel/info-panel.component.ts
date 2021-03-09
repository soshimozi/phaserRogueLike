import { Component, Input, OnInit } from '@angular/core';

export interface IInformation {
  label: string;
  val: any;
}

@Component({
    selector: 'app-info-panel',
    templateUrl: './info-panel.component.html'
  })
export class InfoPanelComponent {
  @Input()
  header: string;

  @Input()
  infos: IInformation[];

  constructor() {
  }

}
