import {NgModule, APP_INITIALIZER, OnInit} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import {HttpModule, Response}    from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginFormComponent } from "./login/login-form.component";
import { RoomComponent } from "./room/room-page.component";
import {NavbarComponent} from "./shared/navbar.component";
import {SidenavComponent} from "./room/side-nav.component";
import {RoomContentComponent} from "./room/room-content.component";
import {NextActivityComponent} from "./room/next-activity.component";
import {ProblemsComponent} from "./room/problems.component";
import {FeaturesComponent} from "./room/features.component";
import {NewRoomComponent} from "./room/new-room.component";
import {HttpService, DiscoveryEntry} from "./shared/http.service";
import {isBoolean} from "util";

const appRoutes : Routes = [
    {path: "login", component: LoginFormComponent},
    {path: "room/:id", component: RoomComponent}
];

@NgModule({
    imports: [ BrowserModule, FormsModule, RouterModule.forRoot(appRoutes), HttpModule],
    declarations: [
        AppComponent,
        LoginFormComponent,
        RoomComponent,
        NavbarComponent,
        SidenavComponent,
        RoomContentComponent,
        NextActivityComponent,
        ProblemsComponent,
        FeaturesComponent,
        NewRoomComponent
    ],
    bootstrap:    [ AppComponent ]
})


export class AppModule {

}
