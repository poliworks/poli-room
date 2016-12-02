import {Component, OnInit, ChangeDetectorRef, Input, Output, OnChanges, SimpleChanges} from '@angular/core';
import { Router,
    NavigationExtras } from '@angular/router';
import {HttpService} from "../shared/http.service";
import {Response} from "@angular/http";
import {log} from "util";
declare var moment : any;
declare var jQuery : any;
@Component({
    selector: `room-next-activity`,
    template: `
    <!-- PROXIMAS ATIVIDADES -->
    <div class="col s12s m6">
        <div class="card">
          <div class="card-content">
            <span class="card-title">Próximas Atitivades</span>
            <!--<button data-target="new-activity-modal" class="right btn">+</button>-->
            <a (click)="openNewActivityModal()" class="modal-trigger waves-effect waves-light btn right" href="#new-activity-modal">+</a>
            <ul class="collection">
              <li *ngFor="let event of this.events;" class="collection-item">
                <span class="title">{{event.name}} - {{getFormattedDate(event.startTime)}}</span>
                <p>
                  {{getFormattedTime(event.startTime)}} - {{getFormattedTime(event.endTime)}}<br/>
                  {{event.description}}
                </p>
              </li>
            </ul>
          </div>
        </div>
     </div>
    `
})
export class NextActivityComponent implements OnInit, OnChanges {


    openNewActivityModal() {
        jQuery('select').material_select();
    }
    ngOnChanges(changes: SimpleChanges): void {
        this.getEvents();
    }

    constructor (private http: HttpService) { }

    ngOnInit(): void {
        this.events = [];
    }

    @Input() roomId: number;

    events : Object[] = [];

    getFormattedTime(utc: string) : string {
        return moment(utc).format("hh:mm")
    }
    getFormattedDate(utc: string): string {
        return moment(utc).format("DD/MM")
    }

    private getEvents() {
        this.http.req({url: "room_events",
            method: "get",
            replaceMap: {id: this.roomId},
            handler: this.setEvents.bind(this)})
    }

    private setEvents(response: Response) {
        console.log("events was");
        console.log(this.events);
        this.events = response.json();
        console.log("setting events to");
        console.log(response.json());
    }
}
