import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { LoginFormComponent } from "./login-form.component";
import { RoomComponent } from "./room-page.component";
import {NavbarComponent} from "./navbar.component";

const appRoutes : Routes = [
    {path: "login", component: LoginFormComponent},
    {path: "room/:id", component: RoomComponent}
]

@NgModule({
    imports: [ BrowserModule,
        RouterModule.forRoot(appRoutes)
                ],
    declarations: [ AppComponent, LoginFormComponent, RoomComponent, NavbarComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
