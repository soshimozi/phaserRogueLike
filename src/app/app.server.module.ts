import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

@NgModule({
    imports: [AppModule, ServerModule, ModuleMapLoaderModule, CommonModule, BrowserModule],
    bootstrap: [AppComponent]
})
export class AppServerModule { }
