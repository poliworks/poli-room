import {Component, OnInit} from '@angular/core';
import { Router,
    NavigationExtras } from '@angular/router';
import {Response} from "@angular/http";
import {HttpService} from "../shared/http.service";
declare var jQuery : any;

@Component({
    selector: "side-nav",
    template: `
    <ul class="side-nav fixed collapsible" data-collapsible="accordion">
        <li>
            <a class="modal-trigger waves-effect waves-green collapsible-header" href="#new-room-modal">Nova Sala</a>
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
    `,
    providers: [HttpService]
})
export class SidenavComponent implements OnInit {

    buildingsRooms : Object = {};

    getRoomsPerBuilding(response: Response) {
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

    buildings : Object[] = ["Prédio da Administracão", "Prédio da Civil"]; //Object.keys(buildingRooms);

    constructor(private http: HttpService) {}

    ngOnInit(): void {
        console.log("Requesting to get rooms");
        let reqMap = {url: "rooms_per_building", method: "get", handler: this.getRoomsPerBuilding};
        this.http.req(reqMap);
        jQuery('.collapsible').collapsible();
        //jQuery('.modal-trigger').leanModal();
    }
}
