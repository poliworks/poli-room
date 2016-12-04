import {Component, Input, SimpleChanges, OnChanges} from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import {HttpService} from "../../shared/http.service";
import {Response} from "@angular/http";

@Component({
    selector: `room-features`,
    template: `
              <div *ngFor="let feature of features" class="col s6 m2">
                <div class="card">
                  <div class="card-image">
                    <img src="assets/img/{{feature.img}}" class="feature">
                    <div class="card-content feature-text">
                      <p>{{feature.name}}</p>
                    </div>
                  </div>
                </div>
              </div>
    `
})
export class FeaturesComponent implements OnChanges {

    @Input() roomId: number;

    features : Object[] = [];

    constructor (private http: HttpService) { }

    getFeatures() {

        this.http.req({url: "room_features",
            method: "get",
            replaceMap: {id: this.roomId},
            handler: this.setFeatures.bind(this)})
    }

    setFeatures(response: Response) {
        this.features = response.json();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.getFeatures();
    }

}

export class Feature {
    name: string;
    description: string;
    quantity: number;
    img: string;
}
