import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Router,
    NavigationExtras } from '@angular/router';
import {HttpService} from "../shared/http.service";
declare var jQuery : any;
declare var flatpickr : any;
declare var moment : any;

@Component({
    selector: `new-activity-modal`,
    styleUrls: ['assets/css/new-activity.css'],
    template: `
    <div id="new-activity-modal" class="modal modal-fixed-footer">
        <div class="modal-content">
          <h4>Nova Atividade</h4>
            <div class="row">
                <form id="new-activity-form" class="col s12">
                    <div class="row">
                        <div class="input-field col s12">
                          <input id="activity_name" type="text" class="validate" [(ngModel)]="model.name" name="name">
                          <label for="activity_name">Nome da Atividade</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                          <textarea id="activity_description" class="materialize-textarea" [(ngModel)]="model.description" name="description"></textarea>
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
                                <option *ngFor="let rt of getRecurrenceTypes()" [ngValue]="rt">{{rt}}</option>
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
export class NewActivityComponent implements OnInit {

    @Output() onNewActivityCreation = new EventEmitter<Activity>();

    model : Activity = new Activity();
    startTimeString: string;
    endTimeString: string;
    recurrenceTypesMap : Object = {
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
        //this.model.building = jQuery("#new-room-form input.select-dropdown")[0].value;
        console.log(this.model);
        this.registerActivity(this.model);
    }
    emitNewActivityCreation(activity : any) {
        this.onNewActivityCreation.emit(activity);
    }


    registerActivity(activity  : any){
        let r = {
            "name": "Engenharia de Comunicações",
            "description": "Uma aula muito divertida!",
            "recurrence": "weekly",
            "startTime": 1480587600000,
            "endTime": 1480597200000,
            "scheduledBy": 1,
            "roomId": 7
        };
        let reqMap = {url: "register_events", method: "post", body: r, handler: this.emitNewActivityCreation.bind(this)};
        this.http.req(reqMap);
    }
    getRecurrenceTypes() {

        return Object.keys(this.recurrenceTypesMap);
    }
}
export class Activity {
    name: string;
    description: string;
    recurrence: string;
    startTime: number;
    endTime: number;
    scheduledBy: number;
}
