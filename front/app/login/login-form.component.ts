import {Component, OnInit}        from '@angular/core';
import {
    Router,
    NavigationExtras, ActivatedRoute, Route
} from '@angular/router';
import {HttpService} from "../shared/http.service";
import {Response, Http} from "@angular/http";

declare var jQuery: any;
declare var Materialize: any;

@Component({
    template: `
      <div class="container">
        <div class="row">
          <div class="col m6 offset-m3">
            <div class="card brand">
              <div class="card-content white-text">
                <span class="card-title">Login</span>
                <div class="row">
                  <div class="input-field col s12">
                    <input id="username" type="text" class="validate" [(ngModel)]="email">
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
                    <a id="loginSubmit" class="btn waves-effect waves-light indigo lighten-1 right" (click)="login()">Login</a>
                    <a id="registerSubmit" class="left btn waves-effect waves-light indigo lighten-1" href="register">Register</a>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    `
})
export class LoginFormComponent implements OnInit {

    email: string;
    password: string;

    constructor (private http: HttpService, private router: Router, private route: ActivatedRoute) {}

    ngOnInit(): void {
        let forbidden = this.route.snapshot.queryParams["forbidden"];
        if (forbidden) {
            Materialize.toast("Acessor negado, login obrigatorio", 4000);
        } else if (HttpService.isLoggedIn()) {
            this.router.navigate(["room", 1])
        }
    }

    login() {
        this.http.req({url: "login_user", body: {email: this.email, password: this.password}, handler: this.makeLogin.bind(this)})
    }

    makeLogin(response: Response) {
        HttpService.setUser(response.json());
        this.router.navigate(["/room/", 1]);
    }

}
