import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from "../../shared/http.service";
declare var jQuery: any;
declare var flatpickr: any;
declare var moment: any;

@Component({
    selector: `new-event-modal`,
    styleUrls: ['assets/css/new-activity.css'],
    template: `
    <div id="new-activity-modal" class="modal modal-fixed-footer">
        <div class="modal-content">
          <h4>Nova Atividade</h4>
            <div class="row">
                <form id="new-activity-form" class="col s12">
                    <div class="row">
                        <div class="input-field col s12">
                          <input id="activity_name" type="text" class="validate" [(ngModel)]="event.name" name="name">
                          <label for="activity_name">Nome da Atividade</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                          <textarea id="activity_description" class="materialize-textarea" [(ngModel)]="event.description" name="description"></textarea>
                          <label for="activity_description">Descrição</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="label-time col s4">Horário de Início: </div>
                        <div class="col s8">
                            <input class="flatpickr" style="color:white" type="text" [(ngModel)]="startTimeString" placeholder="Selecionar horário..." name="startTimeString">
                        </div>
                    </div>
                    <div class="row">
                        <div class="label-time col s4">Horário de Término: </div>
                        <div class="col s8">
                            <input class="flatpickr" style="color:white" type="text" [(ngModel)]="endTimeString" placeholder="Selecionar horário..." name="endTimeString">
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s6">
                            <select id="na-select-recurrence" name="recurrence">
                                <option *ngFor="let rt of getRecurrenceTypes()" [ngValue]="event.recurrence">{{rt}}</option>
                            </select>
                        <label>Recorrência</label>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="modal-footer">
          <a (click)="createActivity()" class="modal-action modal-close waves-effect waves-green btn-flat ">Criar Atividade</a>
        </div>
    </div>
    `
})
export class NewEventComponent implements OnInit {

    @Output() onNewActivityCreation = new EventEmitter<Event>();
    @Input() roomId: number;

    event: Event = new Event();
    startTimeString: string;
    endTimeString: string;
    recurrenceTypesMap: Object = {
        "Única": "single",
        "Diariamente": "daily",
        "Semanalmente": "weekly",
        "Mensalmente": "monthly",
        "Anualmente": "yearly"
    };

    constructor(private http: HttpService) {}

    ngOnInit() {
        jQuery('.modal-trigger').leanModal();
        flatpickr(".flatpickr", {
            enableTime: true
        });
    }

    createActivity() {
        this.event.recurrence = this.recurrenceTypesMap[jQuery("#new-activity-form input.select-dropdown")[0].value];
        this.registerActivity(this.event);
    }

    emitNewActivityCreation(activity: any) {
        this.onNewActivityCreation.emit(this.event);
    }

    registerActivity(activity: Event) {
        let r = {
            "name": activity.name,
            "description": activity.description,
            "recurrence": activity.recurrence,
            "startTime": parseInt(moment(this.startTimeString).format("X")),
            "endTime": parseInt(moment(this.endTimeString).format("X")),
            "scheduledBy": HttpService.user.id};

        this.http.req({url: "register_events",
                       body: r,
                       replaceMap: {id: this.roomId},
                       handler: this.emitNewActivityCreation.bind(this)});
    }

    getRecurrenceTypes() {
        return Object.keys(this.recurrenceTypesMap);
    }
}
export class Event {
    name: string;
    description: string;
    recurrence: string;
    startTime: number;
    endTime: number;
    scheduledBy: number;
}
