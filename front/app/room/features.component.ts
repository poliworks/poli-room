import { Component } from '@angular/core';
import { Router,
    NavigationExtras } from '@angular/router';

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
export class FeaturesComponent {
    features : Array[] = [
        {
            "name": "quadro branco",
            "img": "whiteboard.png",
            "id": 1
        },
        {
            "name": "quadro negro",
            "img": "blackboard.png",
            "id": 2
        },
        {
            "name": "ar condicionado",
            "img": "ac.png",
            "id": 3
        },
        {
            "name": "caixa de som",
            "img": "sound.png",
            "id": 6
        }
    ]
}
