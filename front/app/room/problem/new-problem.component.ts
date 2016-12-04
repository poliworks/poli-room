import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { Router,
    NavigationExtras } from '@angular/router';
import {HttpService} from "../../shared/http.service";
declare var jQuery : any;
declare var flatpickr : any;
declare var moment : any;

@Component({
    selector: `new-problem-modal`,
    styleUrls: ['assets/css/new-problem.css'],
    template: `
    <div id="new-problem-modal" class="modal modal-fixed-footer">
        <div class="modal-content">
          <h4>Novo Relatório de Manutenção</h4>
            <div class="row">
                <form id="new-problem-form" class="col s12">
                    <div class="row">
                        <div class="input-field col s12">
                          <input id="problem_name" type="text" class="validate" [(ngModel)]="model.name" name="name">
                          <label for="problem_name">Titulo</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                          <textarea id="problem_description" class="materialize-textarea" [(ngModel)]="model.description" name="description"></textarea>
                          <label for="problem_description">Descrição</label>
                        </div>
                    </div>
                    <div>
                        <select-feature [roomId]="roomId"></select-feature>              
                    </div>
                </form>
            </div>
        </div>
        <div class="modal-footer">
          <a (click)="createProblem()" class="modal-action modal-close waves-effect waves-green btn-flat ">Reportar Manutenção</a>
        </div>
    </div>
    `
})
export class NewProblemComponent implements OnInit {

    @Input() roomId : number;
    @Output() onNewProblemCreation = new EventEmitter<Problem>();

    model : Problem = new Problem();

    constructor(private http: HttpService) {}

    ngOnInit() {
        jQuery('.modal-trigger').leanModal();
    }
    createProblem() {
        //this.model.building = jQuery("#new-room-form input.select-dropdown")[0].value;
        console.log(this.model);
        this.registerProblem(this.model);
    }
    emitNewProblemCreation(problem : any) {
        this.onNewProblemCreation.emit(problem);
    }


    registerProblem(problem  : any){
        let reqMap = {url: "register_problem", replaceMap: {id: this.roomId}, body: problem, handler: this.emitNewProblemCreation.bind(this)};
        this.http.req(reqMap);
    }
}
export class Problem {
    name: string;
    description: string;
    reportedBy: number = 1;
    reportedAt: number;
    featureId: number;
}
