import { Component } from '@angular/core';
import {NavbarComponent} from "./navbar.component";

@Component({
    selector: 'my-app',
    directives: [NavbarComponent],
    template: `
        <navbar></navbar>
        <h1>Hello {{name}}</h1>
            <nav>
                <a routerLink="/room/3" routerLinkActive="active">Room3</a>
                <a routerLink="/login" routerLinkActive="active">Login</a>
            </nav>
        <router-outlet></router-outlet>
              `
})
export class AppComponent  { name = 'Angular'; }
