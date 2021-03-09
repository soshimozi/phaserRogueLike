import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {DungeonGameComponent} from './dungeon-game/dungeon-game.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { InfoPanelComponent } from './info-panel/info-panel.component';
import { ListPanelComponent } from './list-panel/list-panel.component';
import { LegendComponent } from './legend/legend.component';
import { OpponentInfoComponent } from './opponent-info/opponent-info.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DungeonGameComponent,
    UserInfoComponent,
    InfoPanelComponent,
    ListPanelComponent,
    LegendComponent,
    OpponentInfoComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
