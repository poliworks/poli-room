import { Component } from '@angular/core';
import { Router,
    NavigationExtras } from '@angular/router';

@Component({
    selector: `room-content`,
    template: `
    <div class="main-space">
        <div class="main-container">
          <div class="row">
            <h1 class="title"> Sala B2-04 </h1>
            <h5 class="subtitle"> Prédio da Elétrica </h5>
            <br/>

            <div class="row">
              <room-next-activity></room-next-activity>
              <room-problems></room-problems>
            </div> <!-- end row of MANUTENÇÃO and PROXIMAS ATIVIDADES -->
            <div class="row">
              <room-features></room-features>
            </div> <!-- FEATURES ROW -->
          </div> <!-- end main row -->

        </div>
    </div>
    `
})
export class RoomContentComponent { }
