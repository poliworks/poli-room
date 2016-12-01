import {Component, OnInit} from '@angular/core';
import {HttpService, DiscoveryEntry} from "./shared/http.service";
import {Response} from "@angular/http";

@Component({
    selector: 'my-app',
    template: `
      <navbar></navbar>
      <div class="site-space" style="position: relative; top: 64px;">
        <router-outlet></router-outlet>
      </div>
              
     `,
    providers: [HttpService]
})

export class AppComponent  {

}
