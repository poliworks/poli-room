import {Component, Input, SimpleChanges, OnChanges, Output} from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import {HttpService} from "../../shared/http.service";
import {Response} from "@angular/http";
import {Feature} from "./features.component";

declare var jQuery:any;
@Component({
    selector: `select-feature`,
    template: `
              <div *ngFor="let feature of features" class="col s6 m2">
                <div class="card feature-option" id="feature-{{feature.id}}"(click)="featureClick($event)">
                  <div class="card-image">
                    <img src="assets/img/{{feature.img}}" class="feature">
                    <div class="card-content feature-text">
                      <p style="color:black">{{feature.name}}</p>
                    </div>
                  </div>
                </div>
              </div>
    `,
    styles: [".selected-feature { border: 5px solid grey}"]
})
export class SelectFeatureComponent implements OnChanges {

    @Input() roomId: number;

    @Output('selected') selectedFeature: Feature = new Feature();

    features : Feature[] = [];
    featureClick(e: any) {
        console.log("feature-click!")
        console.log(e, e.target, e.srcElement, e.currentTarget);
        let id = e.currentTarget.attributes.id.nodeValue;
        jQuery(`.card`).removeClass("selected-feature");
        jQuery(`#${id}`).addClass("selected-feature")

    }
    constructor (private http: HttpService) { }

    getFeatures() {

        this.http.req({url: "room_features",
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
