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
              <a *ngFor="let room of this.buildingsRooms[building]" class="room" routerLink="/room/{{room.id}}" href="#">{{room.name}}</a>
            </div>
          </div>
        </li>
      </ul>
      <new-room-modal (onNewRoomCreation)="onNewRoomCreation($event);"></new-room-modal>
    `,
    providers: [HttpService]
})
export class SidenavComponent implements OnInit {

    buildingsRooms : Object = {};
    onNewRoomCreation(room : any) {
        console.log("newRoomWasCreated")
        console.log(room);
        //this.buildingsRooms[room.building].push(room);
        this.getRoomsPerBuilding();
    }
    newRoomOpenModal() {
        console.log("nova sala");
        jQuery('select').material_select();
    }
    setRoomsPerBuilding(response: Response) {
        console.group("RESPOSTA");
        console.log(response);
        console.log(response.json());
        console.groupEnd();
        this.buildingsRooms = response.json();
    }


    getBuildings() {
        let buildings : Object[] = [];
        for(let k in this.buildingsRooms) {
            buildings.push(k);
        }
        return buildings;
    }

    constructor(private http: HttpService) {}

    getRoomsPerBuilding(){
        let reqMap = {url: "rooms_per_building", handler: this.setRoomsPerBuilding.bind(this)};
        this.http.req(reqMap);
    }
    ngOnInit(): void {
        console.log("Requesting to get rooms");
        this.getRoomsPerBuilding();
        jQuery('.collapsible').collapsible();
    }
}
