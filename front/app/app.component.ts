import {Component, OnInit} from '@angular/core';
import {RoomService} from "./room/room.service";
import {Response} from "@angular/http";

@Component({
    selector: 'my-app',
    template: `
      <navbar></navbar>
      <div class="site-space" style="position: relative; top: 64px;">
        <router-outlet></router-outlet>
      </div>
              
     `,
    providers: [RoomService]
})

export class AppComponent implements OnInit {

    private static discovery: Object[];

    ngOnInit(): void {
        this.roomService.getRooms().then(d => this.setDiscovery(d));
    }

    setDiscovery(discovery: Response) {
        discovery = discovery.json();
        console.log(discovery)
    }

    name = 'Angular';

    constructor(private roomService: RoomService) { }

}
