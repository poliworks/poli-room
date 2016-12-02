import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Router,
    NavigationExtras } from '@angular/router';
declare var jQuery : any;
@Component({
    selector: `new-room-modal`,
    styleUrls: ['app/room/new-room.css'],
    template: `
    <div id="new-room-modal" class="modal modal-fixed-footer">
        <div class="modal-content">
          <h4>Nova Sala</h4>
            <div class="row">
                <form id="new-room-form" class="col s12">
                    <div class="row">
                        <div class="input-field col s6">
                          <input id="room_name" type="text" class="validate" [(ngModel)]="model.name" name="name">
                          <label for="room_name">First Name</label>
                        </div>
                        <div class="input-field col s6">
                            <select id="nr-select-building" name="building">
                                <option *ngFor="let b of getBuildings()" [ngValue]="b">{{b}}</option>
                            </select>
                        <label>Prédio</label>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="modal-footer">
          <a (click)="createRoom()" class="modal-action modal-close waves-effect waves-green btn-flat ">Criar Sala</a>
        </div>
    </div>
    `
})
export class NewRoomComponent implements OnInit {
    @Output onNewRoomCreation = new EventEmitter<Room>();

    model : Room = new Room();
    ngOnInit() {
        jQuery('.modal-trigger').leanModal();
        this.model.building = "";
        this.model.name = "";
    }
    createRoom() {
        this.model.building = jQuery("#new-room-form input.select-dropdown")[0].value;
        console.log(this.model);
        this.onNewRoomCreation.emit(this.model);
    }
    getBuildings() {
        return ["Prédio da Elétrica", "Prédio da Civil"];
    }
}
export class Room {
    name: string;
    building: string;
}
