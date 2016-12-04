import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {HttpService} from "../../shared/http.service";
import {Response} from "@angular/http";
declare var moment: any;
declare var jQuery: any;

@Component({
    selector: `room-events`,
    template: `
    <!-- PROXIMAS ATIVIDADES -->
    <div class="col s12s m6">
        <div class="card">
          <div class="card-content">
            <span class="card-title">Próximas Atitivades</span>
            <a (click)="openNewActivityModal()" class="modal-trigger waves-effect waves-light btn right" href="#new-activity-modal">+</a>
            <ul class="collection">
              <li *ngFor="let event of this.events;" class="collection-item">
                <button (click)="deleteEvent(event)" aria-label="Close Account Info Modal Box" class="right btn btn-floating red">&times;</button>
                <span class="title">{{event.name}} - {{getFormattedDate(event.startTime)}}</span>
                <p>
                  {{getFormattedTime(event.startTime)}} - {{getFormattedTime(event.endTime)}}<br/>
                  {{recurrenceMap[event.recurrence]}}<br/>
                  {{event.description}}
                </p>
              </li>
            </ul>
          </div>
        </div>
     </div>
    `
})
export class EventsComponent implements OnInit, OnChanges {

    @Input() roomId: number;
    @Input() changes: number;
    recurrenceMap = {single: "Unica", weekly: "Semanal", monthly: "Mensal", yearly: "Anual", daily: "Diaria"}
    events: Object[] = [];

    constructor(private http: HttpService) { }

    ngOnInit(): void {
        this.events = [];
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.getEvents();
    }

    openNewActivityModal() {
        jQuery('select').material_select();
    }

    deleteEvent(e: any) {
        this.http.req({url: "delete_event", replaceMap: {id: e.id}, handler: this.getEvents.bind(this)})
    }


    getFormattedTime(utc: string): string {
        return moment(utc).format("hh:mm")
    }

    getFormattedDate(utc: string): string {
        return moment(utc).format("DD/MM")
    }

    private getEvents() {
        this.http.req({
            url: "room_events",
            replaceMap: {id: this.roomId},
            handler: this.setEvents.bind(this)
        })
    }


    private setEvents(response: Response) {
        this.events = response.json();
    }
}
