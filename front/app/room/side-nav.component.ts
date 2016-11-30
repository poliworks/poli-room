import {Component, OnInit} from '@angular/core';
import { Router,
    NavigationExtras } from '@angular/router';
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
    `
})
export class SidenavComponent implements OnInit {
    buildingsRooms : Map<string, any> = {
        "Prédio da Elétrica": [
            {id: 1, name: "B2-04"},
            {id: 2, name: "B2-05"},
            {id: 3, name: "B2-08"},
            {id: 4, name: "C1-49"}
        ],
        "Prédio da Biênio": [
            {name: "B1-04"},
            {name: "B1-05"},
            {name: "B1-01"}
        ],
        "Prédio do Civil": [
            {name: "S11"},
            {name: "S17"}
        ]
    };
    getBuildings() {
        let buildings : Array[] = [];
        for(let k in this.buildingsRooms) {
            buildings.push(k);
        }
        return buildings;
    }
    buildings : Array[] = ["Prédio da Administracão", "Prédio da Civil"]; //Object.keys(buildingRooms);
    ngOnInit(){
        jQuery('.collapsible').collapsible();
        //jQuery('.modal-trigger').leanModal();
    }
}
