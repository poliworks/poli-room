import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Router, Params, NavigationExtras, ActivatedRoute} from '@angular/router';
import {HttpService} from "../../shared/http.service";
import {Response} from "@angular/http";

@Component({
    selector: `room-problems`,
    template: `

      <div class="col s12s m6">
        <!-- MANUTENÇÃO -->
        <div class="card">
          <div class="card-content">
            <span class="card-title">Manutenções Cadastradas</span>
            <a (click)="openNewProblemModal()" class="modal-trigger waves-effect waves-light btn right" href="#new-problem-modal">+</a>
            <ul class="collection">
              <li *ngFor="let problem of problems;" class="collection-item">
              
                <button (click)="deleteProblem(problem)" aria-label="Close Account Info Modal Box" class="right btn btn-floating red">&times;</button>
                <span class="title">{{problem.name}}</span>
                <p>{{problem.description}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div> <!-- ends col MANUTENÇÃO -->
    `
})
export class ProblemsComponent implements OnInit, OnChanges {
    @Input() changes: number;
    ngOnChanges(changes: SimpleChanges): void {
        this.getProblems()
    }
    openNewProblemModal() {
        console.log("Novo problema na área");
    }
    problems : Object[] = [];
    deleteProblem(e: any) {
        console.log("Deleta problema")
        this.http.req({url: "delete_problem", replaceMap: {id: e.id}, handler: this.getProblems.bind(this)});
        console.log(e);
    }
    @Input() roomId: number;

    constructor (private http: HttpService, private route: ActivatedRoute, private router: Router) {}

    ngOnInit() {
        this.getProblems();
    }

    getProblems() {
        this.http.req({url: "room_problems",
                       replaceMap: {id: this.roomId},
                       handler: this.setProblems.bind(this)})
    }

    setProblems(response: Response) {
        this.problems = response.json();
        console.log(response.json());
    }


}