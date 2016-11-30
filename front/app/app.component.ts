import {Component, OnInit} from '@angular/core';
import {RoomService, HttpService} from "./room/room.service";
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

export class AppComponent implements OnInit {

    static discovery: Object = {};

    ngOnInit(): void {
        let reqMap = {url: "http://localhost:9000/discovery", method: "GET", handler: AppComponent.setDiscovery};
        this.http.req(reqMap);
    }

    static setDiscovery(discovery: Response) {
        discovery = discovery.json();
        console.log(discovery)
    }

    name = 'Angular';

    constructor(private http: HttpService) { }

}
