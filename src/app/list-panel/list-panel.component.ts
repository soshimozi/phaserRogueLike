import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-list-panel',
    templateUrl: './list-panel.component.html'
  })
export class ListPanelComponent {
      @Input() list: string[];
      @Input() header: string;
}
