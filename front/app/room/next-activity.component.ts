import { Component } from '@angular/core';
import { Router,
    NavigationExtras } from '@angular/router';
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
export class NextActivityComponent {
    events : Array[] = [
        {
            "name": "Evento 1",
            "description": "Um evento qualquer",
            "recurrence": "weekly",
            "startTime": "2016-11-30T13:36:12.000-0200",
            "endTime": "2016-11-30T14:36:15.721-0200",
            "scheduledBy": 1,
            "roomId": 1,
            "id": 3
        },
        {
            "name": "Evento 1",
            "description": "Um evento qualquer",
            "recurrence": "weekly",
            "startTime": "2016-11-30T13:36:12.000-0200",
            "endTime": "2016-11-30T14:36:15.721-0200",
            "scheduledBy": 1,
            "roomId": 3,
            "id": 2
        }
    ]
    getFormattedTime(utc: string) : string {
        return moment(utc).format("hh:mm")
    }
    getFormattedDate(utc: string): string {
        return moment(utc).format("DD/MM")
    }
}
