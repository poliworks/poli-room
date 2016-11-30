import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { LoginFormComponent } from "./login/login-form.component";
import { RoomComponent } from "./room/room-page.component";
import {NavbarComponent} from "./shared/navbar.component";
import {SidenavComponent} from "./room/side-nav.component";

const appRoutes : Routes = [
    {path: "login", component: LoginFormComponent},
    {path: "room/:id", component: RoomComponent}
]

@NgModule({
    imports: [ BrowserModule,
        RouterModule.forRoot(appRoutes)
                ],
    declarations: [ AppComponent, LoginFormComponent, RoomComponent, NavbarComponent, SidenavComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
