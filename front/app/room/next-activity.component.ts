import {Component, OnInit} from '@angular/core';
import { Router,
    NavigationExtras } from '@angular/router';
import {HttpService} from "../shared/http.service";
import {Response} from "@angular/http";
declare var moment : any;
@Component({
    selector: `room-next-activity`,
    template: `
    <!-- PROXIMAS ATIVIDADES -->
    <div class="col s12s m6">
        <div class="card">
          <div class="card-content">
            <span class="card-title">Próximas Atitivades</span>
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
export class NextActivityComponent implements OnInit {

    constructor (private http: HttpService) {}

    ngOnInit(): void {
        this.http.req({url: "room_events",
                       method: "get",
                       replaceMap: {id: 1},
                       handler: this.setEvents})
    }

    events : Object[] = [];

    getFormattedTime(utc: string) : string {
        return moment(utc).format("hh:mm")
    }
    getFormattedDate(utc: string): string {
        return moment(utc).format("DD/MM")
    }

    private setEvents(response: Response) {
        this.events = response.json();
        console.log(response)
    }
}
