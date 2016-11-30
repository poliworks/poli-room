import {Component, OnInit} from '@angular/core';
import { Router,
    NavigationExtras } from '@angular/router';
declare var jQuery : any;

@Component({
    selector: "side-nav",
    template: `
    <ul class="side-nav fixed collapsible" data-collapsible="accordion">
        <li>
          <div class="waves-effect waves-blue collapsible-header">Prédio da Elétrica</div>
          <div class="collapsible-body">
            <div class="collection">
              <a class="room" href="#!">B2-04</a>
              <a class="room" href="#!">B2-05</a>
              <a class="room" href="#!">B2-08</a>
              <a class="room" href="#!">C1-49</a>
            </div>
          </div>
        </li>
        <li>
          <div class="waves-effect waves-blue collapsible-header">Prédio da Biênio</div>
          <div class="collapsible-body">
            <div class="collection">
              <a href="#!">B1-04</a>
              <a href="#!">B1-05</a>
              <a href="#!">B1-01</a>
              <a href="#!">A1-04</a>
            </div>
          </div>
        </li>
        <li>
          <div class="waves-effect waves-blue collapsible-header">Prédio da Biênio</div>
          <div class="collapsible-body">
            <div class="collection">
              <a href="#!">S11</a>
              <a href="#!">S17</a>
            </div>
          </div>
        </li>
      </ul>
    `
})
export class SidenavComponent implements OnInit {
    ngOnInit(){
        console.log("Porra");
        jQuery('.collapsible').collapsible();

    }
}
