import { Component } from '@angular/core';
import { Router,
    NavigationExtras } from '@angular/router';
import {HttpService} from "./http.service";

@Component({
    selector: `navbar`,
    template: `
      <nav>
        <div class="nav-wrapper brand">
          <ul id="nav-mobile" class="left hide-on-med-and-down">
              <li><img src="assets/img/logo.png" class="logo" height="60 px"></li>
              <li><a href="#" class="logoside-name">Poli Classroom</a></li>
          </ul>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li *ngIf="isLoggedIn()"><button style="margin-right: 15px" class="btn" (click)="logOut()">LogOut</button></li>
          </ul>
        </div>
      </nav>
    `
})
export class NavbarComponent {

    constructor (private router: Router) {}

    isLoggedIn() {
        return HttpService.isLoggedIn()
    }

    logOut() {
        HttpService.destroySession();
        this.router.navigate(["/login"])
    }

}
