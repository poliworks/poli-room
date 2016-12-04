import {Component, OnInit, AfterViewInit}        from '@angular/core';
import { Router,
    NavigationExtras } from '@angular/router';
import {HttpService} from "../shared/http.service";
import {Response} from "@angular/http";

declare var jQuery: any;

@Component({
    template: `
      <div class="container">
        <div class="row">
          <div class="col m6 offset-m3">
            <div class="card brand">
              <div class="card-content white-text">
                <span class="card-title">Register</span>
                <div class="row">
                  <div class="input-field col s12">
                    <input id="email" type="text" class="validate" [(ngModel)]="email">
                    <label for="" class="white-text">Email</label>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s12">
                    <input id="password" type="password" class="validate" [(ngModel)]="password">
                    <label for="password" class="white-text">Password</label>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s12">
                    <input id="name" type="text" class="validate" [(ngModel)]="name">
                    <label for="" class="white-text">Name</label>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s12">
                    <select id="nr-select-userType" name="building">
                                <option *ngFor="let type of getUserTypes()" [ngValue]="userTypes[type]">{{type}}</option>
                     </select>
                    <label for="" class="white-text">UserType</label>
                  </div>
                </div>
                <a id="loginSubmit" class="btn waves-effect waves-light indigo lighten-1 submit-button" (click)="register()">Submit
                  <i class="material-icons right">send</i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
})
export class RegisterFormComponent implements AfterViewInit{

    email: string;
    password: string;
    name: string;
    userType: string;
    userTypes = {"Aluno": "student", "Professor": "teacher"}

    constructor (private http: HttpService, private router: Router) {}

    ngAfterViewInit(): void {
        jQuery("select").material_select();
    }


    getUserTypes() {
        return Object.keys(this.userTypes);
    }

    register() {
        this.userType = this.userTypes[jQuery('.select-dropdown')[0].value];
        console.log(this.userType);
        this.http.req({url: "register_user", body: {email: this.email,
                                                    password: this.password,
                                                    name: this.name,
                                                    user_type: this.userType}, handler: this.makeRegister.bind(this)})
    }

    makeRegister(response: Response) {
        console.log(response);
        HttpService.setUser(response.json());
        this.router.navigate(["/room", 1])
    }

}
