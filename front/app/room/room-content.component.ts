import {Component, OnInit} from '@angular/core';
import {Router, Params, NavigationExtras, ActivatedRoute} from '@angular/router';
import {HttpService} from "../shared/http.service";
import {Response} from "@angular/http";

@Component({
    selector: `room-content`,
    template: `
    <div class="main-space">
        <div class="main-container">
          <div class="row">
            <h1 class="title">{{this.name}}</h1>
            <h5 class="subtitle">{{this.building}}</h5>
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
export class RoomContentComponent implements OnInit {

    constructor(private http: HttpService, private route: ActivatedRoute, private router: Router) {}

    roomId: number;
    name: string;
    building: string;

    ngOnInit() {
        this.roomId = this.route.snapshot.params["id"];
        this.http.req({url: "get_room",
                       method: "get",
                       replaceMap: {id: this.roomId},
                       handler: this.setRoom.bind(this)})
    }

    setRoom(response: Response) {
        let json = response.json();
        this.name = json["name"];
        this.building = json["building"];
    }

}
