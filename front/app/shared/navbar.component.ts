import { Component } from '@angular/core';
import { Router,
    NavigationExtras } from '@angular/router';

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
          </ul>
        </div>
      </nav>
    `
})
export class NavbarComponent { }
