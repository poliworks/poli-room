import {Component, OnInit} from '@angular/core';
import { Router,
    NavigationExtras } from '@angular/router';
import {Response} from "@angular/http";
import {HttpService} from "../shared/http.service";
import {Room} from "./new-room.component";
declare var jQuery : any;

@Component({
    selector: "side-nav",
    template: `
    <ul class="side-nav fixed collapsible" data-collapsible="accordion">
        <li>
            <a class="modal-trigger waves-effect waves-green collapsible-header" (click)="newRoomOpenModal()" href="#new-room-modal">Nova Sala</a>
        </li>
        <li *ngFor="let building of getBuildings()">
          <div class="waves-effect waves-blue collapsible-header">{{building}}</div>
          <div class="collapsible-body">
            <div class="collection">
              <a *ngFor="let room of buildingsRooms[building]" class="room" routerLink="/room/{{room.id}}">{{room.name}}</a>
            </div>
          </div>
        </li>
      </ul>
      <new-room-modal (onNewRoomCreation)="onNewRoomCreation()"></new-room-modal>
    `,
    providers: [HttpService]
})
export class SidenavComponent implements OnInit {

    buildingsRooms : Object = {};

    constructor(private http: HttpService) {}

    ngOnInit(): void {
        this.getRoomsPerBuilding();
        jQuery('.collapsible').collapsible();
    }

    private onNewRoomCreation() {
        this.getRoomsPerBuilding();
    }

    private newRoomOpenModal() {
        jQuery('select').material_select();
    }

    private setRoomsPerBuilding(response: Response) {
        this.buildingsRooms = response.json();
    }

    private getBuildings() {
        return Object.keys(this.buildingsRooms);
    }

    private getRoomsPerBuilding(){
        this.http.req({url: "rooms_per_building",
                       handler: this.setRoomsPerBuilding.bind(this)});
    }
}
