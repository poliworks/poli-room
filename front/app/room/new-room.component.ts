import {Component, OnInit} from '@angular/core';
import { Router,
    NavigationExtras } from '@angular/router';
declare var jQuery : any;
@Component({
    selector: `new-room-modal`,
    template: `
    <div id="new-room-modal" class="modal modal-fixed-footer">
        <div class="modal-content">
          <h4>Modal Header</h4>
          <p>A bunch of text</p>
        </div>
        <div class="modal-footer">
          <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat ">Agree</a>
        </div>
    </div>
    `
})
export class NewRoomComponent implements OnInit {
    ngOnInit() {
        jQuery('.modal-trigger').leanModal();
    }
}
