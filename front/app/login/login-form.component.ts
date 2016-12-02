import {Component, OnInit}        from '@angular/core';
import { Router,
    NavigationExtras } from '@angular/router';

declare var jQuery: any;

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
                    <input id="username" type="text" class="validate">
                    <label for="" class="white-text">Username</label>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s12">
                    <input id="password" type="password" class="validate">
                    <label for="password" class="white-text">Password</label>
                  </div>
                </div>
                <a id="loginSubmit" class="btn waves-effect waves-light indigo lighten-1 submit-button" href="/room/3">Submit
                  <i class="material-icons right">send</i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
})
export class LoginFormComponent {

}
